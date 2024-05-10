import ConnectDB from "@/utils/connect_db";
import Signs from "@/models/signs";
import Order from "@/models/orders";
import Product from "@/models/product";
import Category from "@/models/category";
import StandardApi from "@/middlewares/standard_api";
import { getDateOfTimezone, groupBy } from "@/utils/cyphers";

const Metrics = async (req, res) => StandardApi(req, res, { method: "GET", verify_admin: true }, async () => {
    await ConnectDB();
    const currentDate = getDateOfTimezone();

    const avgPeriod = 30; // in days

    // Signs metrics
    const pastMonthDate = new Date(getDateOfTimezone().setDate(currentDate.getDate() - avgPeriod));
    const signMetrics = await Signs.find({ createdAt: { $gt: pastMonthDate } }).sort({ _id: 1 });

    const dailyVisitsNumbers = [];
    const dailySignupsNumbers = [];
    const groupedItems = groupBy(signMetrics, "month");
    Object.keys(groupedItems).forEach(key => {
        const dateGrouping = Object.values(groupBy(groupedItems[key], "date"))[0];
        const signups = dateGrouping.filter(item => item.type == "signup").length;;
        const visits = dateGrouping.filter(item => item.type == "visit").length;;
        dailySignupsNumbers.push(signups)
        dailyVisitsNumbers.push(visits)
    });

    const avg_signups = dailySignupsNumbers.reduce((acc, value) => acc + value, 0) / avgPeriod;
    const avg_visits = dailyVisitsNumbers.reduce((acc, value) => acc + value, 0) / avgPeriod;

    // Order metrics
    const total_orders = await Order.countDocuments({ "order_status.group": { $ne: "cancelled" } });
    const cancelled_orders = await Order.countDocuments({ "order_status.group": "cancelled" });
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthlySoldOrders = await Order.find({
        "order_status.group": "delivered",
        $or: [
            { updatedAt: { $gte: firstDayOfMonth } },
            { createdAt: { $gte: firstDayOfMonth } }
        ]
    }).lean();
    const monthly_sales = monthlySoldOrders.reduce((acc, item) => {
        const totalProducts = item.order_items.reduce((acc, p) => acc + p.quantity, 0);
        const totalGifts = item.gift_cards.reduce((acc, g) => acc + g.quantity, 0)
        return acc + totalProducts + totalGifts;
    }, 0)
    const monthly_revenue = monthlySoldOrders.reduce((acc, item) => acc + item.price_details.total, 0);
    const daily_revenue = monthlySoldOrders.filter(order => order.order_status.group === "delivered" && new Date(order.updatedAt).getTime() >= currentDate.setHours(0, 0, 0, 0)).length;

    // Product metrics
    const total_products = await Product.countDocuments();
    const total_category = (await Category.countDocuments()) - 1;

    const metrics = {
        avg_signups,
        avg_visits,
        total_orders,
        cancelled_orders,
        total_products,
        total_category,
        monthly_sales,
        monthly_revenue,
        daily_revenue
    }
    res.status(200).json({ success: true, msg: '', metrics })
})
export default Metrics;