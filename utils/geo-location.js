import axios from 'axios'
import countryCodes from '@/static data/countryCodes';
import useUser from '@/hooks/useUser';
import useWallet from '@/hooks/useWallet';

const getGeoLocation = async () => {
    const { setCountry, geo_selected_by_user } = useUser.getState()
    const { setCurrency, getExchangeRate, currency_selected_by_user } = useWallet.getState()
    if (geo_selected_by_user || currency_selected_by_user) return
    else try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/geolocation`)
        const filteredCountry = countryCodes.filter(country => country.country === data?.geo_meta?.country?.toLowerCase())[0]
        if (filteredCountry) {
            setCountry(filteredCountry)
            switch (filteredCountry.country) {
                case "sa":
                    setCurrency("SAR")
                    await getExchangeRate("SAR")
                    break;
                case "pk":
                    setCurrency("PKR")
                    await getExchangeRate("PKR")
                    break;
                case "ae":
                    setCurrency("AED")
                    await getExchangeRate("AED")
                    break;
                default: break;
            }
        }
        else return setCountry({ name: "United Arab Emirates", code: "+971", country: "ae", src: process.env.NEXT_PUBLIC_BASE_IMG_URL + "/country-flags/AE.webp" })
    } catch (error) { console.log(error) }
}
export default getGeoLocation