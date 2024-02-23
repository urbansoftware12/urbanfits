import CutomerServices from '../index'
import LinkBtn from '@/components/buttons/link_btn'
import Link from 'next/link'
import SizeTableAccordian from '@/components/accordians/sizeTable-accordian'

export const TableButton = (props) => {
    return <>
        <LinkBtn href={props.href} bg='bg-gold' font='font_urbanist_medium' fontSize='text-xs' classes={`hidden md:flex sticky left-0 ${props.classes ? props.classes : 'w-36'}`} >{props.children}</LinkBtn>
        <div className='sticky left-0 md:hidden btn_width h-[38px] p-[1px] bg-gold rounded-md' >
            <Link href={props.href || "#"} >
                <div className='w-full h-full bg-white rounded-[5px] flex justify-center items-center font_urbanist_medium text-[10px] tracking-vast' >{props.children}</div>
            </Link>
        </div>
    </>
}

export const HelpSection = () => {
    return <div className="w-full flex flex-col md:flex-row md:justify-between sm:items-center font_urbanist text-xs md:text-sm gap-3">
        <div className='mb-2 md:mb-0 flex flex-col md:flex-row' >
            <span className="mb-1.5 md:mb-0 mr-2 font_urbanist_bold">Need Help?</span>
            We are available Monday to Sunday: 9 AM 6 PM
        </div>
        <LinkBtn my='0' classes='w-36 sm:w-48' href='/contact' >Contact Us</LinkBtn>
    </div>
}

export default function Women() {
    return (
        <CutomerServices>
            <h1 className="mb-6 font_urbanist_bold text-sm md:text-lg xl:text-xl tracking-vast">Women' Sizes</h1>
            <SizeTableAccordian title='Coats, Jackets, Blazers' tableHeading='Urban Fits' indexColWidth='w-32 xl:w-[16%]' restColsWidth='w-15 xl:w-[7%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL', '7XL']}
                rowsData={[
                    ['UK/IE Size', 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
                    ['US Size', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
                    ['EU Size', 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54],
                    ['FR Size', 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56],
                    ['IT Size', 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
                    ['Sleeve', { CM: '77.8- 78.3', INCH: '30⅗- 30⅘' }, { CM: '78.3- 78.8', INCH: '30⅘- 31' }, { CM: '78.8- 79.3', INCH: '31- 31⅕' }, { CM: '79.3- 79.8', INCH: '31⅕- 31⅖' }, { CM: '79.8- 80.3', INCH: '31⅖ - 31⅗' }, { CM: '80.3- 80.8', INCH: '31⅗ - 31⅘' }, { CM: '80.8- 81.3', INCH: '31⅘- 32' }, { CM: '81.3- 81.8', INCH: '32- 32⅕' }, { CM: '81.8- 82.2', INCH: '32⅕- 32⅖' }, { CM: '82.2- 82.8', INCH: '32⅖- 32⅗' }, { CM: '82.8- 83.2', INCH: '32⅗- 32⅘' }, { CM: '83.5- 84.5', INCH: '32⅞- 33⅓' }],
                    ['Chest', { CM: '76.5- 80.5', INCH: '30⅛- 31⅔' }, { CM: '80.5- 84.5', INCH: '31⅔- 33⅓' }, { CM: '84.5- 88.5', INCH: '33⅓- 34⅘' }, { CM: '88.5-92.5', INCH: '34⅘- 36⅖' }, { CM: '92.5- 96.5', INCH: '36⅖ - 38' }, { CM: '96.5- 101.5', INCH: '38 - 40' }, { CM: '101.5- 106.5', INCH: '40- 41⅞' }, { CM: '106.5- 112', INCH: '41⅞- 44⅛' }, { CM: '113- 118', INCH: '44½- 46½' }, { CM: '118- 123', INCH: '46½- 48⅖' }, { CM: '123- 128', INCH: '48⅖- 50⅖' }, { CM: '128- 134', INCH: '50⅖ - 52⅘' }],
                    ['Waist', { CM: '60- 64', INCH: '30⅛ - 31⅔' }, { CM: '64- 68', INCH: '31⅔ - 33⅓' }, { CM: '68- 72', INCH: '33⅓ - 34⅘' }, { CM: '72- 76', INCH: '34⅘ - 36⅖' }, { CM: '76- 81', INCH: '36⅖ - 38' }, { CM: '81- 86', INCH: '38 - 40' }, { CM: '86- 91', INCH: '40 - 41⅞' }, { CM: '91- 96', INCH: '41⅞ - 44⅛' }, { CM: '97 - 102', INCH: '44½ - 46½' }, { CM: '102 - 107', INCH: '46½ - 48⅖' }, { CM: '107 - 112', INCH: '48⅖ - 50⅖' }, { CM: '112 - 118', INCH: '50⅖ - 52⅘' }],
                    ['Hips', { CM: '85- 89', INCH: '33½- 35' }, { CM: '89- 93', INCH: '35- 36⅗' }, { CM: '93- 97', INCH: '36⅗- 38⅕' }, { CM: '97- 101', INCH: '38⅕- 39⅘' }, { CM: '101- 105', INCH: '39⅘ - 41⅓' }, { CM: '105- 110', INCH: '41⅓ - 43⅓' }, { CM: '110- 115', INCH: '43⅓- 45⅓' }, { CM: '115- 120', INCH: '45⅓ - 47⅕' }, { CM: '121- 126', INCH: '47⅗- 49⅗' }, { CM: '126- 131', INCH: '49⅗- 51⅗' }, { CM: '131- 136', INCH: '51⅗- 53½' }, { CM: '136- 141', INCH: '53½- 55½' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Sweats, Hoodies, Polo knives Tees' tableHeading='Urban Fits' indexColWidth='w-32 xl:w-[16%]' restColsWidth='w-15 xl:w-[7%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL', '7XL']}
                rowsData={[
                    ['UK/IE Size', 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
                    ['US Size', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
                    ['EU Size', 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54],
                    ['FR Size', 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56],
                    ['IT Size', 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
                    ['Sleeve', { CM: '77.8- 78.3', INCH: '30⅗- 30⅘' }, { CM: '78.3- 78.8', INCH: '30⅘- 31' }, { CM: '78.8- 79.3', INCH: '31- 31⅕' }, { CM: '79.3- 79.8', INCH: '31⅕- 31⅖' }, { CM: '79.8- 80.3', INCH: '31⅖ - 31⅗' }, { CM: '80.3- 80.8', INCH: '31⅗ - 31⅘' }, { CM: '80.8- 81.3', INCH: '31⅘- 32' }, { CM: '81.3- 81.8', INCH: '32- 32⅕' }, { CM: '81.8- 82.2', INCH: '32⅕- 32⅖' }, { CM: '82.2- 82.8', INCH: '32⅖- 32⅗' }, { CM: '82.8- 83.2', INCH: '32⅗- 32⅘' }, { CM: '83.5- 84.5', INCH: '32⅞- 33⅓' }],
                    ['Chest', { CM: '76.5- 80.5', INCH: '30⅛- 31⅔' }, { CM: '80.5- 84.5', INCH: '31⅔- 33⅓' }, { CM: '84.5- 88.5', INCH: '33⅓- 34⅘' }, { CM: '88.5-92.5', INCH: '34⅘- 36⅖' }, { CM: '92.5- 96.5', INCH: '36⅖ - 38' }, { CM: '96.5- 101.5', INCH: '38 - 40' }, { CM: '101.5- 106.5', INCH: '40- 41⅞' }, { CM: '106.5- 112', INCH: '41⅞- 44⅛' }, { CM: '113- 118', INCH: '44½- 46½' }, { CM: '118- 123', INCH: '46½- 48⅖' }, { CM: '123- 128', INCH: '48⅖- 50⅖' }, { CM: '128- 134', INCH: '50⅖ - 52⅘' }],
                    ['Waist', { CM: '60- 64', INCH: '30⅛- 31⅔' }, { CM: '64- 68', INCH: '31⅔- 33⅓' }, { CM: '68- 72', INCH: '33⅓- 34⅘' }, { CM: '72- 76', INCH: '34⅘- 36⅖' }, { CM: '76- 81', INCH: '36⅖- 38' }, { CM: '81- 86', INCH: '38- 40' }, { CM: '86- 91', INCH: '40- 41⅞' }, { CM: '91- 96', INCH: '41⅞- 44⅛' }, { CM: '97- 102', INCH: '44½- 46½' }, { CM: '102- 107', INCH: '46½- 48⅖' }, { CM: '107- 112', INCH: '48⅖ - 50⅖' }, { CM: '112- 118', INCH: '50⅖- 52⅘' }],
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Dresses, Skirts, Jumpsuits' tableHeading='Urban Fits' indexColWidth='w-32 xl:w-[16%]' restColsWidth='w-15 xl:w-[7%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL', '7XL']}
                rowsData={[
                    ['UK/IE Size', 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
                    ['US Size', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
                    ['EU Size', 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54],
                    ['FR Size', 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56],
                    ['IT Size', 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
                    ['Sleeve', { CM: '77.8- 78.3', INCH: '30⅗- 30⅘' }, { CM: '78.3- 78.8', INCH: '30⅘- 31' }, { CM: '78.8- 79.3', INCH: '31- 31⅕' }, { CM: '79.3- 79.8', INCH: '31⅕- 31⅖' }, { CM: '79.8- 80.3', INCH: '31⅖ - 31⅗' }, { CM: '80.3- 80.8', INCH: '31⅗ - 31⅘' }, { CM: '80.8- 81.3', INCH: '31⅘- 32' }, { CM: '81.3- 81.8', INCH: '32- 32⅕' }, { CM: '81.8- 82.2', INCH: '32⅕- 32⅖' }, { CM: '82.2- 82.8', INCH: '32⅖- 32⅗' }, { CM: '82.8- 83.2', INCH: '32⅗- 32⅘' }, { CM: '83.5- 84.5', INCH: '32⅞- 33⅓' }],
                    ['Chest', { CM: '76.5- 80.5', INCH: '30⅛- 31⅔' }, { CM: '80.5- 84.5', INCH: '31⅔- 33⅓' }, { CM: '84.5- 88.5', INCH: '33⅓- 34⅘' }, { CM: '88.5-92.5', INCH: '34⅘- 36⅖' }, { CM: '92.5- 96.5', INCH: '36⅖ - 38' }, { CM: '96.5- 101.5', INCH: '38 - 40' }, { CM: '101.5- 106.5', INCH: '40- 41⅞' }, { CM: '106.5- 112', INCH: '41⅞- 44⅛' }, { CM: '113- 118', INCH: '44½- 46½' }, { CM: '118- 123', INCH: '46½- 48⅖' }, { CM: '123- 128', INCH: '48⅖- 50⅖' }, { CM: '128- 134', INCH: '50⅖ - 52⅘' }],
                    ['Hips', { CM: '85- 89', INCH: '33½- 35' }, { CM: '89- 93', INCH: '35- 36⅗' }, { CM: '93- 97', INCH: '36⅗- 38⅕' }, { CM: '97- 101', INCH: '38⅕- 39⅘' }, { CM: '101- 105', INCH: '39⅘ - 41⅓' }, { CM: '105- 110', INCH: '41⅓ - 43⅓' }, { CM: '110- 115', INCH: '43⅓- 45⅓' }, { CM: '115- 120', INCH: '45⅓ - 47⅕' }, { CM: '121- 126', INCH: '47⅗- 49⅗' }, { CM: '126- 131', INCH: '49⅗- 51⅗' }, { CM: '131- 136', INCH: '51⅗- 53½' }, { CM: '136- 141', INCH: '53½- 55½' }]
                ]}>
                <TableButton href='/products/Dresses' >Shop Dresses</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Shirts, Blouses' tableHeading='Urban Fits' indexColWidth='w-32 xl:w-[16%]' restColsWidth='w-15 xl:w-[7%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL', '7XL']}
                rowsData={[
                    ['UK/IE Size', 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
                    ['US Size', 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
                    ['EU Size', 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54],
                    ['FR Size', 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56],
                    ['IT Size', 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
                    ['Sleeve', { CM: '77.8- 78.3', INCH: '30⅗- 30⅘' }, { CM: '78.3- 78.8', INCH: '30⅘- 31' }, { CM: '78.8- 79.3', INCH: '31- 31⅕' }, { CM: '79.3- 79.8', INCH: '31⅕- 31⅖' }, { CM: '79.8- 80.3', INCH: '31⅖ - 31⅗' }, { CM: '80.3- 80.8', INCH: '31⅗ - 31⅘' }, { CM: '80.8- 81.3', INCH: '31⅘- 32' }, { CM: '81.3- 81.8', INCH: '32- 32⅕' }, { CM: '81.8- 82.2', INCH: '32⅕- 32⅖' }, { CM: '82.2- 82.8', INCH: '32⅖- 32⅗' }, { CM: '82.8- 83.2', INCH: '32⅗- 32⅘' }, { CM: '83.5- 84.5', INCH: '32⅞- 33⅓' }],
                    ['Chest', { CM: '76.5- 80.5', INCH: '30⅛- 31⅔' }, { CM: '80.5- 84.5', INCH: '31⅔- 33⅓' }, { CM: '84.5- 88.5', INCH: '33⅓- 34⅘' }, { CM: '88.5-92.5', INCH: '34⅘- 36⅖' }, { CM: '92.5- 96.5', INCH: '36⅖ - 38' }, { CM: '96.5- 101.5', INCH: '38 - 40' }, { CM: '101.5- 106.5', INCH: '40- 41⅞' }, { CM: '106.5- 112', INCH: '41⅞- 44⅛' }, { CM: '113- 118', INCH: '44½- 46½' }, { CM: '118- 123', INCH: '46½- 48⅖' }, { CM: '123- 128', INCH: '48⅖- 50⅖' }, { CM: '128- 134', INCH: '50⅖ - 52⅘' }],
                    ['Waist', { CM: '60- 64', INCH: '30⅛ - 31⅔' }, { CM: '64- 68', INCH: '31⅔ - 33⅓' }, { CM: '68- 72', INCH: '33⅓ - 34⅘' }, { CM: '72- 76', INCH: '34⅘ - 36⅖' }, { CM: '76- 81', INCH: '36⅖ - 38' }, { CM: '81- 86', INCH: '38 - 40' }, { CM: '86- 91', INCH: '40 - 41⅞' }, { CM: '91- 96', INCH: '41⅞ - 44⅛' }, { CM: '97 - 102', INCH: '44½ - 46½' }, { CM: '102 - 107', INCH: '46½ - 48⅖' }, { CM: '107 - 112', INCH: '48⅖ - 50⅖' }, { CM: '112 - 118', INCH: '50⅖ - 52⅘' }],
                    ['Hips', { CM: '85- 89', INCH: '33½- 35' }, { CM: '89- 93', INCH: '35- 36⅗' }, { CM: '93- 97', INCH: '36⅗- 38⅕' }, { CM: '97- 101', INCH: '38⅕- 39⅘' }, { CM: '101- 105', INCH: '39⅘ - 41⅓' }, { CM: '105- 110', INCH: '41⅓ - 43⅓' }, { CM: '110- 115', INCH: '43⅓- 45⅓' }, { CM: '115- 120', INCH: '45⅓ - 47⅕' }, { CM: '121- 126', INCH: '47⅗- 49⅗' }, { CM: '126- 131', INCH: '49⅗- 51⅗' }, { CM: '131- 136', INCH: '51⅗- 53½' }, { CM: '136- 141', INCH: '53½- 55½' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Urban Denim' tableHeading='Urban Fits' indexColWidth='w-32 xl:w-[16%]' restColsWidth='w-15 xl:w-[7.63%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL', '5XL', '6XL']}
                rowsData={[
                    ['UK/IE Size', 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
                    ['EU Size', 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52],
                    ['Urban Jeans Size', '24', '25-26', '27-28', '29-30', '31', '33', '34', '36', '38', '40', '42'],
                    ['Waist', { CM: '61 - 64', INCH: '24 - 25⅕' }, { CM: '65- 68', INCH: '25⅗ - 26⅘' }, { CM: '69- 72', INCH: '27⅕ - 28⅓' }, { CM: '73- 76', INCH: '28⅔ - 29⅞' }, { CM: '77- 78.5', INCH: '30⅓ - 30⅞' }, { CM: '82- 86', INCH: '32⅓ - 33⅞' }, { CM: '87- 92', INCH: '34⅓ - 36⅕' }, { CM: '93- 98', INCH: '36⅗ - 38⅗' }, { CM: '99 - 104', INCH: '39 - 40⅞' }, { CM: '105 - 110', INCH: '41⅓ - 43⅓' }, { CM: '111 - 116', INCH: '43⅔ - 45⅔' }],
                    ['Hips', { CM: '76 - 79', INCH: '29⅞ - 31⅛' }, { CM: '80 - 83', INCH: '31½ - 32⅔' }, { CM: '84 - 87', INCH: '33⅛ - 34⅓' }, { CM: '88 - 91', INCH: '34⅗ - 35⅘' }, { CM: '92 - 93.5', INCH: '36⅕ - 36⅘' }, { CM: '96 - 101', INCH: '37⅘ - 39⅘' }, { CM: '101 - 106', INCH: '39⅘ - 41⅔' }, { CM: '107 - 112', INCH: '42⅛ - 44⅛' }, { CM: '113 - 118', INCH: '44½ - 46½' }, { CM: '119 - 124', INCH: '46⅞ - 48⅘' }, { CM: '125 - 130', INCH: '49⅕ - 51⅕' }],
                    ['Legs', { CM: '86 - 89', INCH: '33⅞ - 35' }, { CM: '90 - 93', INCH: '35⅖ - 36⅗' }, { CM: '94 - 97', INCH: '37 - 38⅕' }, { CM: '98 - 101', INCH: '38⅗ - 39⅘' }, { CM: '102 - 103.5', INCH: '40⅕ - 40⅔' }, { CM: '106 - 111', INCH: '41⅔ - 43⅔' }, { CM: '112 - 116', INCH: '44⅛ - 45⅔' }, { CM: '117 - 122', INCH: '46⅛ - 48' }, { CM: '123 - 128', INCH: '48⅖ - 50⅖' }, { CM: '129 - 134', INCH: '50⅘ - 52⅘' }, { CM: '135 - 140', INCH: '53⅛ - 55⅛' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Beach Cover ups Tops, Lounge Tops, Bikini Tops, Bras (Alpha Sizes)' tableHeading='Urban Fits' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[8.82%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']}
                rowsData={[
                    ['US Size', 0, 2, 4, '6-8', '8-10', '10-12', 14, 16, '18-20'],
                    ['UK Size', 4, 6, 8, '10-12', '12-14', '14-16', 18, 20, '22-24'],
                    ['EU Size', 32, 34, 36, '38-40', '40-42', '42-44', 46, 48, '50-52'],
                    ['FR Size', 34, 36, 38, '40-42', '42-44', '44-46', 48, 50, '52-54'],
                    ['IT Size', 38, 40, 42, '44-46', '46-48', '48-50', 52, 54, '56-58'],
                    ['Chest', { CM: '74 - 78', INCH: '29⅛ - 30⅔' }, { CM: '79 - 83', INCH: '31⅛ - 32⅔' }, { CM: '84 - 89', INCH: '33⅛ - 35' }, { CM: '90 - 95', INCH: '35⅖ - 37⅖' }, { CM: '96 - 101', INCH: '37⅘ - 39⅘' }, { CM: '102 - 107', INCH: '40⅕ - 42⅛' }, { CM: '108 - 113', INCH: '42½ - 44½' }, { CM: '114 - 120', INCH: '44⅞ - 47⅕' }, { CM: '121 - 127', INCH: '47⅗ - 50' }],
                    ['Waist', { CM: '56 - 60', INCH: '22 - 23⅗' }, { CM: '61 - 65', INCH: '24 - 25⅗' }, { CM: '66 - 71', INCH: '26 - 28' }, { CM: '72 - 77', INCH: '28⅓ - 30⅓' }, { CM: '78 - 83', INCH: '30⅔ - 32⅔' }, { CM: '84 - 89', INCH: '33⅛ - 35' }, { CM: '92 - 97', INCH: '36⅕ - 38⅕' }, { CM: '98 - 104', INCH: '38⅗ - 40⅞' }, { CM: '105 - 111', INCH: '41⅓ - 43⅔' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Beach Cover ups Bottoms, Lounge Bottoms, Bikini Bottoms, Coordinate Panties' tableHeading='Urban Fits' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[8.82%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']}
                rowsData={[
                    ['US Size', 0, 2, 4, '6-8', '8-10', '10-12', 14, 16, '18-20'],
                    ['UK Size', 4, 6, 8, '10-12', '12-14', '14-16', 18, 20, '22-24'],
                    ['EU Size', 32, 34, 36, '38-40', '40-42', '42-44', 46, 48, '50-52'],
                    ['FR Size', 34, 36, 38, '40-42', '42-44', '44-46', 48, 50, '52-54'],
                    ['IT Size', 38, 40, 42, '44-46', '46-48', '48-50', 52, 54, '56-58'],
                    ['Waist', { CM: '56 - 60', INCH: '22 - 23⅗' }, { CM: '61 - 65', INCH: '24 - 25⅗' }, { CM: '66 - 71', INCH: '26 - 28' }, { CM: '72 - 77', INCH: '28⅓ - 30⅓' }, { CM: '78 - 83', INCH: '30⅔ - 32⅔' }, { CM: '84 - 89', INCH: '33⅛ - 35' }, { CM: '92 - 97', INCH: '36⅕ - 38⅕' }, { CM: '98 - 104', INCH: '38⅗ - 40⅞' }, { CM: '105 - 111', INCH: '41⅓ - 43⅔' }],
                    ['Hips', { CM: '82 - 86', INCH: '32⅓ - 33⅞' }, { CM: '87 - 91', INCH: '34⅓ - 35⅘' }, { CM: '92 - 97', INCH: '36⅕ - 38⅕' }, { CM: '98 - 103', INCH: '38⅗ - 40⅗' }, { CM: '104 - 109', INCH: '40⅞ - 42⅞' }, { CM: '110 - 115', INCH: '43⅓ - 45⅓' }, { CM: '116 - 121', INCH: '45⅔ - 47⅗' }, { CM: '122 - 128', INCH: '48 - 50⅖' }, { CM: '129 - 135', INCH: '50⅘ - 53⅛' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Pajama Sets' tableHeading='Urban Fits' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[8.82%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']}
                rowsData={[
                    ['US Size', 0, 2, 4, '6-8', '8-10', '10-12', 14, 16, '18-20'],
                    ['UK Size', 4, 6, 8, '10-12', '12-14', '14-16', 18, 20, '22-24'],
                    ['EU Size', 32, 34, 36, '38-40', '40-42', '42-44', 46, 48, '50-52'],
                    ['FR Size', 34, 36, 38, '40-42', '42-44', '44-46', 48, 50, '52-54'],
                    ['IT Size', 38, 40, 42, '44-46', '46-48', '48-50', 52, 54, '56-58'],
                    ['Chest', { CM: '74 - 78', INCH: '29⅛ - 30⅔' }, { CM: '79 - 83', INCH: '31⅛ - 32⅔' }, { CM: '84 - 89', INCH: '33⅛ - 35' }, { CM: '90 - 95', INCH: '35⅖ - 37⅖' }, { CM: '96 - 101', INCH: '37⅘ - 39⅘' }, { CM: '102 - 107', INCH: '40⅕ - 42⅛' }, { CM: '108 - 113', INCH: '42½ - 44½' }, { CM: '114 - 120', INCH: '44⅞ - 47⅕' }, { CM: '121 - 127', INCH: '47⅗ - 50' }],
                    ['Waist', { CM: '56 - 60', INCH: '22 - 23⅗' }, { CM: '61 - 65', INCH: '24 - 25⅗' }, { CM: '66 - 71', INCH: '26 - 28' }, { CM: '72 - 77', INCH: '28⅓ - 30⅓' }, { CM: '78 - 83', INCH: '30⅔ - 32⅔' }, { CM: '84 - 89', INCH: '33⅛ - 35' }, { CM: '92 - 97', INCH: '36⅕ - 38⅕' }, { CM: '98 - 104', INCH: '38⅗ - 40⅞' }, { CM: '105 - 111', INCH: '41⅓ - 43⅔' }],
                    ['Hips', { CM: '82 - 86', INCH: '32⅓ - 33⅞' }, { CM: '87 - 91', INCH: '34⅓ - 35⅘' }, { CM: '92 - 97', INCH: '36⅕ - 38⅕' }, { CM: '98 - 103', INCH: '38⅗ - 40⅗' }, { CM: '104 - 109', INCH: '40⅞ - 42⅞' }, { CM: '110 - 115', INCH: '43⅓ - 45⅓' }, { CM: '116 - 121', INCH: '45⅔ - 47⅗' }, { CM: '122 - 128', INCH: '48 - 50⅖' }, { CM: '129 - 135', INCH: '50⅘ - 53⅛' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Women Shoes' tableHeading='' indexColWidth='w-32 xl:w-[8%]' restColsWidth='w-15 xl:w-[5.75%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '6XL', '7XL', '8XL', '9XL', '10XL', '11XL']}
                rowsData={[
                    ['UK Size', 2.5, 3, 3.5, 3.5, 4, 4.5, 5, 5.5, 6, 6, 6.5, 6.5, 7, 7, 7.5, 7.5,],
                    ['EU Size', 35, 35.5, 36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5],
                    ['US Size', 5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 8.5, 9, 9, 9.5, 9.5, 10, 10],
                    ['CM', { CM: 22, INCH: '8⅔' }, { CM: 22.5, INCH: '8⅞' }, { CM: 23, INCH: '9⅛' }, { CM: 23, INCH: '9⅛' }, { CM: 23.5, INCH: '9⅓' }, { CM: 23.5, INCH: '9⅓' }, { CM: 24, INCH: '9⅖' }, { CM: 24.5, INCH: '9⅗' }, { CM: 25, INCH: '9⅘' }, { CM: 25, INCH: '9⅘' }, { CM: 25.5, INCH: 10 }, { CM: 25.5, INCH: 10 }, { CM: 26, INCH: '10⅕' }, { CM: 26.5, INCH: '10⅖' }, { CM: 27, INCH: '10⅗' }, { CM: 27.5, INCH: '10⅘' }]
                ]}>
                <TableButton href='/products/Women-Shoes' classes='w-48'>SHOP WOMEN SHOES</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Belts' tableHeading='Size' indexColWidth='w-24' restColsWidth='w-16' unitBtns={null}
                columnHeadings={['S-M', 'L-XL']} rowsData={[['CM', '70cm', '80cm']]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Socks' tableHeading='Label' indexColWidth='w-32' restColsWidth='w-20' unitBtns={null}
                columnHeadings={['S-M', 'L-XL']}
                rowsData={[
                    ['Shoe Size', '35', '39'],
                    ['Foot Length', '21.7-24.3', '24.4-27']
                ]}>
            </SizeTableAccordian>
            <h1 className="mt-20 lg:mt-28 mb-6 font_urbanist_bold text-sm md:text-lg xl:text-xl tracking-vast">Urban Jeans Sizes</h1>
            <SizeTableAccordian title='Dresses, Jumpsuits' tableHeading='Label(XS-XL)' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[13.3%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['EU Size', '30-32', '32-34', '36-38', '38-40', '40-42', '42-44'],
                    ['US + UK Size', '2-4', '4-6', '8-10', '10-12', '12-14', '14-16'],
                    ['FR Size', '36-38', '38-40', '42-44', '44-46', '46-48', '48-50'],
                    ['IT Size', '32-34', '34-36', '38-40', '40-42', '42-44', '44-46'],
                    ['US Size', '00-0', '0-2', '4-6', '6-8', '8-10', '10-12'],
                    ['Chest', { CM: '76 - 78.5', INCH: '29⅞ - 30⅞' }, { CM: '78.5 - 83.5', INCH: '30⅞ - 32⅞' }, { CM: '83.5 - 88.5', INCH: '32⅞ - 34⅘' }, { CM: '88.5 - 93.5', INCH: '34⅘ - 36⅘' }, { CM: '93.5 - 98.5', INCH: '36⅘ - 38⅘' }, { CM: '98.5 - 103.5', INCH: '38⅘ - 40⅔' }],
                    ['Waist', { CM: '58 - 60.5', INCH: '22⅘ - 23⅘' }, { CM: '60.5 - 65.5', INCH: '23⅘ - 25⅘' }, { CM: '65.5 - 70.5', INCH: '25⅘ - 27⅘' }, { CM: '70.5 - 75.5', INCH: '27⅘ - 29⅔' }, { CM: '75.5 - 80.5', INCH: '29⅔ - 31⅔' }, { CM: '80.5 - 85.5', INCH: '31⅔ - 33⅔' }],
                    ['Hips', { CM: '84 - 86.5', INCH: '33⅛ - 34⅛' }, { CM: '86.5 - 91.5', INCH: '34⅛ - 36' }, { CM: '91.5 - 96.5', INCH: '36 - 38' }, { CM: '96.5 - 101.5', INCH: '38 - 40' }, { CM: '101.5 - 106.5', INCH: '40 - 41⅞' }, { CM: '106.5 - 111.5', INCH: '41⅞ - 43⅞' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Coats, Jackets' tableHeading='Label(XS-XL)' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[13.3%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['EU Size', '30-32', '32-34', '36-38', '38-40', '40-42', '42-44'],
                    ['US + UK Size', '2-4', '4-6', '8-10', '10-12', '12-14', '14-16'],
                    ['FR Size', '32-34', '34-36', '38-40', '40-42', '42-44', '44-46'],
                    ['IT Size', '36-38', '38-40', '42-44', '44-46', '46-48', '48-50'],
                    ['US Size', '00-0', '0-2', '4-6', '6-8', '8-10', '10-12'],
                    ['Chest', { CM: '76 - 78.5', INCH: '29⅞ - 30⅞' }, { CM: '78.5 - 83.5', INCH: '30⅞ - 32⅞' }, { CM: '83.5 - 88.5', INCH: '32⅞ - 34⅘' }, { CM: '88.5 - 93.5', INCH: '34⅘ - 36⅘' }, { CM: '93.5 - 98.5', INCH: '36⅘ - 38⅘' }, { CM: '98.5 - 103.5', INCH: '38⅘ - 40⅔' }],
                    ['Waist', { CM: '58 - 60.5', INCH: '22⅘ - 23⅘' }, { CM: '60.5 - 65.5', INCH: '23⅘ - 25⅘' }, { CM: '65.5 - 70.5', INCH: '25⅘ - 27⅘' }, { CM: '70.5 - 75.5', INCH: '27⅘ - 29⅔' }, { CM: '75.5 - 80.5', INCH: '29⅔ - 31⅔' }, { CM: '80.5 - 85.5', INCH: '31⅔ - 33⅔' }],
                    ['Hips', { CM: '84 - 86.5', INCH: '33⅛ - 34⅛' }, { CM: '86.5 - 91.5', INCH: '34⅛ - 36' }, { CM: '91.5 - 96.5', INCH: '36 - 38' }, { CM: '96.5 - 101.5', INCH: '38 - 40' }, { CM: '101.5 - 106.5', INCH: '40 - 41⅞' }, { CM: '106.5 - 111.5', INCH: '41⅞ - 43⅞' }],
                    ['Sleeve', { CM: '84 - 86.5', INCH: '30⅗ - 30⅘' }, { CM: '86.5 - 91.5', INCH: '30⅘ - 31' }, { CM: '91.5 - 96.5', INCH: '31 - 31⅕' }, { CM: '96.5 - 101.5', INCH: '31⅕ - 31⅖' }, { CM: '101.5 - 106.5', INCH: '31⅕ - 31⅖' }, { CM: '106.5 - 111.5', INCH: '31⅗ - 31⅘' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Knitwear, Shirts, Blouses, Tops' tableHeading='Label(XS-XL)' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[13.3%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['EU Size', '30-32', '32-34', '36-38', '38-40', '40-42', '42-44'],
                    ['US + UK Size', '2-4', '4-6', '8-10', '10-12', '12-14', '14-16'],
                    ['FR Size', '32-34', '34-36', '38-40', '40-42', '42-44', '44-46'],
                    ['IT Size', '36-38', '38-40', '42-44', '44-46', '46-48', '48-50'],
                    ['US Size', '00-0', '0-2', '4-6', '6-8', '8-10', '10-12'],
                    ['Chest', { CM: '76 - 78.5', INCH: '29⅞ - 30⅞' }, { CM: '78.5 - 83.5', INCH: '30⅞ - 32⅞' }, { CM: '83.5 - 88.5', INCH: '32⅞ - 34⅘' }, { CM: '88.5 - 93.5', INCH: '34⅘ - 36⅘' }, { CM: '93.5 - 98.5', INCH: '36⅘ - 38⅘' }, { CM: '98.5 - 103.5', INCH: '38⅘ - 40⅔' }],
                    ['Waist', { CM: '58 - 60.5', INCH: '22⅘ - 23⅘' }, { CM: '60.5 - 65.5', INCH: '23⅘ - 25⅘' }, { CM: '65.5 - 70.5', INCH: '25⅘ - 27⅘' }, { CM: '70.5 - 75.5', INCH: '27⅘ - 29⅔' }, { CM: '75.5 - 80.5', INCH: '29⅔ - 31⅔' }, { CM: '80.5 - 85.5', INCH: '31⅔ - 33⅔' }],
                    ['Sleeve', { CM: '84 - 86.5', INCH: '30⅗ - 30⅘' }, { CM: '86.5 - 91.5', INCH: '30⅘ - 31' }, { CM: '91.5 - 96.5', INCH: '31 - 31⅕' }, { CM: '96.5 - 101.5', INCH: '31⅕ - 31⅖' }, { CM: '101.5 - 106.5', INCH: '31⅕ - 31⅖' }, { CM: '106.5 - 111.5', INCH: '31⅗ - 31⅘' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Pants' tableHeading='Label(XS-XL)' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[13.3%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['EU Size', '30-32', '32-34', '36-38', '38-40', '40-42', '42-44'],
                    ['US + UK Size', '2-4', '4-6', '8-10', '10-12', '12-14', '14-16'],
                    ['FR Size', '32-34', '34-36', '38-40', '40-42', '42-44', '44-46'],
                    ['IT Size', '36-38', '38-40', '42-44', '44-46', '46-48', '48-50'],
                    ['US Size', '00-0', '0-2', '4-6', '6-8', '8-10', '10-12'],
                    ['Waist', { CM: '58 - 60.5', INCH: '22⅘ - 23⅘' }, { CM: '60.5 - 65.5', INCH: '23⅘ - 25⅘' }, { CM: '65.5 - 70.5', INCH: '25⅘ - 27⅘' }, { CM: '70.5 - 75.5', INCH: '27⅘ - 29⅔' }, { CM: '75.5 - 80.5', INCH: '29⅔ - 31⅔' }, { CM: '80.5 - 85.5', INCH: '31⅔ - 33⅔' }],
                    ['Hips', { CM: '84 - 86.5', INCH: '33⅛ - 34⅛' }, { CM: '86.5 - 91.5', INCH: '34⅛ - 36' }, { CM: '91.5 - 96.5', INCH: '36 - 38' }, { CM: '96.5 - 101.5', INCH: '38 - 40' }, { CM: '101.5 - 106.5', INCH: '40 - 41⅞' }, { CM: '106.5 - 111.5', INCH: '41⅞ - 43⅞' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Jeans' tableHeading='Urban Size' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[7.27%]'
                columnHeadings={[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]}
                rowsData={[
                    ['EU Size', '32', '34-36', '34-36', '36-38', '36-38', '38-40', '38-40', '40-42', '40-42', 44, 44],
                    ['UK/IE Size', '4', '6-8', '6-8', '8-10', '8-10', '10-12', '10-12', '12-14', '12-14', 14, 14],
                    ['FR Size', '34', '36-38', '36-38', '38-40', '38-40', '40-42', '40-42', '42-44', '42-44', 44, 44],
                    ['IT Size', '38', '40-42', '40-42', '42-44', '42-44', '44-46', '44-46', '46-48', '46-48', 48, 48],
                    ['US Size', '0-2', '2-4', '2-4', '4-6', '4-6', '6-8', '6-8', '8-10', '8-10', 10, 10],
                    ['Waist', { CM: '60 - 64', INCH: '23⅗ - 25⅕' }, { CM: '64 - 66', INCH: '25⅕ - 26' }, { CM: '66 - 68', INCH: '26 - 26⅘' }, { CM: '68 - 70', INCH: '26⅘ - 27⅗' }, { CM: '70 - 72', INCH: '27⅗ - 28⅓' }, { CM: '72 - 74', INCH: '28⅓ - 29⅛' }, { CM: '74 - 76', INCH: '29⅛ - 29⅞' }, { CM: '76 - 78', INCH: '29⅞ - 30⅔' }, { CM: '78 - 81', INCH: '30⅔ - 31⅞' }, { CM: '82 - 86', INCH: '32⅓ - 33⅞' }, { CM: '87 - 91', INCH: '34⅓ - 35⅘' }],
                    ['Hips', { CM: '85 - 89', INCH: '33½ - 35' }, { CM: '89 - 91', INCH: '35 - 35⅘' }, { CM: '91 - 93', INCH: '35⅘ - 36⅗' }, { CM: '93 - 95', INCH: '36⅗ - 37⅖' }, { CM: '95 - 97', INCH: '37⅖ - 38⅕' }, { CM: '97 - 99', INCH: '38⅕ - 39' }, { CM: '97 - 99', INCH: '39 - 39⅘' }, { CM: '101 - 103', INCH: '39⅘ - 40⅗' }, { CM: '103 - 105', INCH: '40⅗ - 41⅓' }, { CM: '106 - 110', INCH: '41⅔ - 43⅓' }, { CM: '111 - 115', INCH: '43⅔ - 45⅓' }],
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Inseam Jeans length' tableHeading='Inseam Jeans Length' headingTracking_null indexColWidth='w-32 lg:w-[30%]' restColsWidth='w-15 lg:w-[17%]'
                bigFontOf_nthRow={[0]}
                columnHeadings={['28"', '30"', '32"', '34"']}
                rowsData={[['Inseam', { CM: '68.5 - 73.5', INCH: '27 - 28⅞' }, { CM: '73.5 - 78.5', INCH: '28⅞ - 30⅞' }, { CM: '78.5 - 83.5', INCH: '30⅞ - 32⅞' }, { CM: '83.5 - 88.5', INCH: '32⅞ - 34⅘' }]]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Sweaters, T-Shirts, Other Knits, Outerwear, Dresses' tableHeading='Label(XS-XL)' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[13.3%]'
                bigFontOf_nthRow={[3, 4, 5, 6]}
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['US + UK Size', 4, 6, 8, 10, 12, 14],
                    ['IT + FR Size', 34, 36, 38, 40, 42, 44],
                    ['EU Size', 32, 34, 36, 38, 40, 42],
                    ['Chest', { CM: '30-32', INCH: '11⅘ - 12⅗' }, { CM: '32-34', INCH: '12⅗ - 13' }, { CM: '36-38', INCH: '13⅖ - 13⅘' }, { CM: '38-40', INCH: '14⅕ - 14⅗' }, { CM: '40-42', INCH: '15⅖ - 16⅛' }, { CM: '42-44', INCH: '16½ - 17⅓' }],
                    ['Waist', { CM: '60', INCH: '23⅗' }, { CM: '64', INCH: '25⅕' }, { CM: '68', INCH: '26⅘' }, { CM: '72', INCH: '28⅓' }, { CM: '76', INCH: '29⅞' }, { CM: '80', INCH: '31½' }],
                    ['Hips', { CM: '86', INCH: '33⅞' }, { CM: '90', INCH: '35⅖' }, { CM: '94', INCH: '37' }, { CM: '98', INCH: '38⅗' }, { CM: '102', INCH: '40⅕' }, { CM: '106', INCH: '41⅔' }],
                    ['Inside Legs', { CM: '76.5', INCH: '30⅛' }, { CM: '77', INCH: '30⅓' }, { CM: '77.5', INCH: '30½' }, { CM: '78', INCH: '30⅔' }, { CM: '78', INCH: '30⅞' }, { CM: '78', INCH: '31⅛' }]
                ]}>
                <TableButton href='/products/Urban Jeans' classes='w-48'>Shop Urban Jeans</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Sweaters, T-Shirts, Other Knitwear, Outerwear, Dresses' tableHeading='Label(XS-XL)' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-[13.3%]'
                bigFontOf_nthRow={[3, 4, 5]}
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['US + UK Size', 4, 6, 8, 10, 12, 14],
                    ['IT + FR Size', 34, 36, 38, 40, 42, 44],
                    ['EU Size', 32, 34, 36, 38, 40, 42],
                    ['Waist', { CM: '60', INCH: '23⅗' }, { CM: '64', INCH: '25⅕' }, { CM: '68', INCH: '26⅘' }, { CM: '72', INCH: '28⅓' }, { CM: '76', INCH: '29⅞' }, { CM: '80', INCH: '31½' }],
                    ['Hips', { CM: '86', INCH: '33⅞' }, { CM: '90', INCH: '35⅖' }, { CM: '94', INCH: '37' }, { CM: '98', INCH: '38⅗' }, { CM: '102', INCH: '40⅕' }, { CM: '106', INCH: '41⅔' }],
                    ['Inside Legs', { CM: '76.5', INCH: '30⅛' }, { CM: '77', INCH: '30⅓' }, { CM: '77.5', INCH: '30½' }, { CM: '78', INCH: '30⅔' }, { CM: '78', INCH: '30⅞' }, { CM: '78', INCH: '31⅛' }]
                ]}>
            </SizeTableAccordian>
            <h1 className="mt-20 lg:mt-28 mb-6 font_urbanist_bold text-sm md:text-lg xl:text-xl tracking-vast">UF Curve</h1>
            <SizeTableAccordian title='Coats, Jackets' tableHeading='UF CURVE SIZE' indexColWidth='w-32 lg:w-1/4' restColsWidth='w-15 lg:w-1/4'
                bigFontOf_nthRow={[5, 6, 7, 8]}
                columnHeadings={['1XL', '2XL', '3XL']}
                rowsData={[
                    ['EU Size', 46, 48, 50],
                    ['UK/IE Size', 18, 20, 22],
                    ['FR Size', 48, 50, 52],
                    ['IT Size', 52, 54, 56],
                    ['US Size', 14, 16, 18],
                    ['Chest', { CM: '106.5 - 112', INCH: '41⅞ - 44⅛' }, { CM: '113 - 118', INCH: '44½ - 46½' }, { CM: '118 - 123', INCH: '46½ - 48⅖' }],
                    ['Waist', { CM: '91 - 96', INCH: '35⅘ - 37⅘' }, { CM: '97 - 102', INCH: '38⅕ - 40⅕' }, { CM: '102 - 107', INCH: '40⅕ - 42⅛' }],
                    ['Hips', { CM: '115 - 120', INCH: '45⅓ - 47⅕' }, { CM: '121 - 126', INCH: '47⅗ - 49⅗' }, { CM: '126 - 131', INCH: '49⅗ - 51⅗' }],
                    ['Sleeve', { CM: '81.3 - 81.8', INCH: '32 - 32⅕' }, { CM: '81.8 - 82.2', INCH: '32⅕ - 32⅖' }, { CM: '82.2 - 82.8', INCH: '32⅖ - 32⅗' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Dresses' tableHeading='UF Curve Size' indexColWidth='w-32 lg:w-1/4' restColsWidth='w-15 lg:w-1/4'
                bigFontOf_nthRow={[5, 6, 7]}
                columnHeadings={['1XL', '2XL', '3XL']}
                rowsData={[
                    ['EU Size', 46, 48, 50],
                    ['UK/IE Size', 18, 20, 22],
                    ['FR Size', 48, 50, 52],
                    ['IT Size', 52, 54, 56],
                    ['US Size', 14, 16, 18],
                    ['Chest', { CM: '106.5 - 112', INCH: '41⅞ - 44⅛' }, { CM: '113 - 118', INCH: '44½ - 46½' }, { CM: '118 - 123', INCH: '46½ - 48⅖' }],
                    ['Waist', { CM: '91 - 96', INCH: '35⅘ - 37⅘' }, { CM: '97 - 102', INCH: '38⅕ - 40⅕' }, { CM: '102 - 107', INCH: '40⅕ - 42⅛' }],
                    ['Hips', { CM: '115 - 120', INCH: '45⅓ - 47⅕' }, { CM: '121 - 126', INCH: '47⅗ - 49⅗' }, { CM: '126 - 131', INCH: '49⅗ - 51⅗' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Knitwear, Shirts, Blouses, Tops' tableHeading='UF Curve Size' indexColWidth='w-32 lg:w-1/4' restColsWidth='w-15 lg:w-1/4'
                bigFontOf_nthRow={[5, 6, 7]}
                columnHeadings={['1XL', '2XL', '3XL']}
                rowsData={[
                    ['EU Size', 46, 48, 50],
                    ['UK/IE Size', 18, 20, 22],
                    ['FR Size', 48, 50, 52],
                    ['IT Size', 52, 54, 56],
                    ['US Size', 14, 16, 18],
                    ['Chest', { CM: '106.5 - 112', INCH: '41⅞ - 44⅛' }, { CM: '113 - 118', INCH: '44½ - 46½' }, { CM: '118 - 123', INCH: '46½ - 48⅖' }],
                    ['Waist', { CM: '91 - 96', INCH: '35⅘ - 37⅘' }, { CM: '97 - 102', INCH: '38⅕ - 40⅕' }, { CM: '102 - 107', INCH: '40⅕ - 42⅛' }],
                    ['Sleeve', { CM: '81.3 - 81.8', INCH: '32 - 32⅕' }, { CM: '81.8 - 82.2', INCH: '32⅕ - 32⅖' }, { CM: '82.2 - 82.8', INCH: '32⅖ - 32⅗' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Pants' tableHeading='UF Curve Size' indexColWidth='w-32 lg:w-1/4' restColsWidth='w-15 lg:w-1/4'
                bigFontOf_nthRow={[5, 6]}
                columnHeadings={['1XL', '2XL', '3XL']}
                rowsData={[
                    ['EU Size', 46, 48, 50],
                    ['UK/IE Size', 18, 20, 22],
                    ['FR Size', 48, 50, 52],
                    ['IT Size', 52, 54, 56],
                    ['US Size', 14, 16, 18],
                    ['Waist', { CM: '91 - 96', INCH: '35⅘ - 37⅘' }, { CM: '97 - 102', INCH: '38⅕ - 40⅕' }, { CM: '102 - 107', INCH: '40⅕ - 42⅛' }],
                    ['Hips', { CM: '115 - 120', INCH: '45⅓ - 47⅕' }, { CM: '121 - 126', INCH: '47⅗ - 49⅗' }, { CM: '126 - 131', INCH: '49⅗ - 51⅗' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Jeans' tableHeading='UF Curve Size' indexColWidth='w-32 lg:w-1/5' restColsWidth='w-15 lg:w-1/5'
                bigFontOf_nthRow={[0, 1]}
                columnHeadings={[36, 38, 40, 42]}
                rowsData={[
                    ['Waist', { CM: '91 - 96', INCH: '35⅘ - 37⅘' }, { CM: '97 - 102', INCH: '38⅕ - 40⅕' }, { CM: '102 - 107', INCH: '40⅕ - 42⅛' }, { CM: '107 - 112', INCH: '42⅛ - 44⅛' }],
                    ['Hips', { CM: '115 - 120', INCH: '45⅓ - 47⅕' }, { CM: '121 - 126', INCH: '47⅗ - 49⅗' }, { CM: '126 - 131', INCH: '49⅗ - 51⅗' }, { CM: '131 - 136', INCH: '51⅗ - 53½' }]
                ]}>
            </SizeTableAccordian>
            <h1 className="mt-20 lg:mt-28 mb-6 font_urbanist_bold text-sm md:text-lg xl:text-xl tracking-vast">Urban Sport Sizes</h1>
            <SizeTableAccordian title='Upper Body + Lower Body' tableHeading='UF Curve Size' indexColWidth='w-32 lg:w-1/4' restColsWidth='w-15 lg:w-[15%]'
                bigFontOf_nthRow={[4, 5, 6, 7]}
                columnHeadings={['XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['US Size', 4, 6, 8, 10, 12],
                    ['UK Size', 6, 8, 10, 12, 14],
                    ['IT + FR Size', 36, 38, 40, 42, 44],
                    ['EU Size', 34, 36, 38, 30, 42],
                    ['Shoulder', { CM: '37.5', INCH: '14⅘' }, { CM: '38', INCH: '15' }, { CM: '38.5', INCH: '15⅕' }, { CM: '40', INCH: '15⅔' }, { CM: '40.75', INCH: '16' }],
                    ['Chest', { CM: '81 - 84', INCH: '31⅞ - 33⅛' }, { CM: '85 - 88', INCH: '33½ - 34⅗' }, { CM: '89 - 92', INCH: '35 - 36⅕' }, { CM: '93 - 96', INCH: '36⅗ - 37⅘' }, { CM: '97 - 100', INCH: '38⅕ - 39⅖' }],
                    ['Waist', { CM: '63 - 67', INCH: '24⅘ - 26⅖' }, { CM: '67 - 70', INCH: '26⅖ - 27⅗' }, { CM: '71 - 74', INCH: '28 - 29⅛' }, { CM: '75 - 78', INCH: '29½ - 30⅔' }, { CM: '79 - 82', INCH: '31⅛ - 32⅓' }],
                    ['Hips', { CM: '89 - 92', INCH: '35 - 36⅕' }, { CM: '93 - 96', INCH: '36⅗ - 37⅘' }, { CM: '97 - 100', INCH: '38⅕ - 39⅖' }, { CM: '101 - 104', INCH: '39⅘ - 40⅞' }, { CM: '105 - 108', INCH: '41⅓ - 42½' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Sport Women - Tops (Incl. T-Shirts, Outerwears, Bras…)' tableHeading='UF Curve Size' indexColWidth='w-32 lg:w-1/4' restColsWidth='w-15 lg:w-[15%]'
                bigFontOf_nthRow={[5, 6, 7, 8]}
                columnHeadings={['XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['EU Size', '32 - 34', '36 - 38', '38 - 40', '40 - 42', '42 - 44'],
                    ['UK/IE Size', '4 - 6', '8 - 10 ', '10 - 12', '12 - 14', '14 - 16'],
                    ['FR Size', '34 - 36', '38 - 40', '40 - 42', '42 - 44', '44 - 46'],
                    ['IT Size', '38 - 40', '42 - 44', '44 - 46', '46 - 48', '48 - 50'],
                    ['US Size', '0 - 2', '4 - 6', '6 - 8', '8 - 10', '10 - 12'],
                    ['Sleeve', { CM: '78.3 - 78.8', INCH: '30⅘ - 31' }, { CM: '78.8 - 79.3', INCH: '31 - 31⅕' }, { CM: '79.3 - 79.8', INCH: '31⅕ - 31⅖' }, { CM: '79.8 - 80.3', INCH: '31⅖ - 31⅗' }, { CM: '80.3 - 80.8', INCH: '31⅗ - 31⅘' }],
                    ['Chest', { CM: '78.5- 83.5', INCH: '30⅞ - 32⅞' }, { CM: '83.5 - 88.5', INCH: '32⅞ - 34⅘' }, { CM: '88.5 - 93.5', INCH: '34⅘ - 36⅘' }, { CM: '93.5 - 98.5', INCH: '36⅘ - 38⅘' }, { CM: '98.5 - 103.5', INCH: '38⅘ - 40⅔' }],
                    ['Waist', { CM: '61.5 - 66.5', INCH: '24⅕ - 26⅕' }, { CM: '66.5 - 71.5', INCH: '26⅕ - 28⅛' }, { CM: '71.5 - 76.5', INCH: '28⅛ - 30⅛' }, { CM: '76.5 - 81.5', INCH: '30⅛ - 32⅛' }, { CM: '81.5 - 86.5', INCH: '32⅛ - 34⅛' }],
                    ['Hips', { CM: '87.5 - 92.5', INCH: '34⅖ - 36⅖' }, { CM: '92.5 - 97.5', INCH: '36⅖ - 38⅖' }, { CM: '97.5 - 102.5', INCH: '38⅖ - 40⅖' }, { CM: '102.5 - 107.5', INCH: '40⅖ - 42⅓' }, { CM: '107.5 - 112.5', INCH: '42⅓ - 44⅓' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Sport Women - Bottoms (Incl Leggings, Pants, Shorts…)' tableHeading='UF Curve Size' indexColWidth='w-32 lg:w-1/4' restColsWidth='w-15 lg:w-[15%]'
                bigFontOf_nthRow={[5, 6]}
                columnHeadings={['XS', 'S', 'M', 'L', 'XL']}
                rowsData={[
                    ['EU Size', '32 - 34', '36 - 38', '38 - 40', '40 - 42', '42 - 44'],
                    ['UK/IE Size', '4 - 6', '8 - 10 ', '10 - 12', '12 - 14', '14 - 16'],
                    ['FR Size', '34 - 36', '38 - 40', '40 - 42', '42 - 44', '44 - 46'],
                    ['IT Size', '38 - 40', '42 - 44', '44 - 46', '46 - 48', '48 - 50'],
                    ['US Size', '0 - 2', '4 - 6', '6 - 8', '8 - 10', '10 - 12'],
                    ['Waist', { CM: '61.5 - 66.5', INCH: '24⅕ - 26⅕' }, { CM: '66.5 - 71.5', INCH: '26⅕ - 28⅛' }, { CM: '71.5 - 76.5', INCH: '28⅛ - 30⅛' }, { CM: '76.5 - 81.5', INCH: '30⅛ - 32⅛' }, { CM: '81.5 - 86.5', INCH: '32⅛ - 34⅛' }],
                    ['Hips', { CM: '87.5 - 92.5', INCH: '34⅖ - 36⅖' }, { CM: '92.5 - 97.5', INCH: '36⅖ - 38⅖' }, { CM: '97.5 - 102.5', INCH: '38⅖ - 40⅖' }, { CM: '102.5 - 107.5', INCH: '40⅖ - 42⅓' }, { CM: '107.5 - 112.5', INCH: '42⅓ - 44⅓' }]
                ]}>
            </SizeTableAccordian>
            <HelpSection />
        </CutomerServices>
    )
}
