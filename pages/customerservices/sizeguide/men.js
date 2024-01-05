import React from 'react'
import CutomerServices from '../index'
import SizeTableAccordian from '@/components/accordians/sizeTable-accordian'
import { TableButton, HelpSection } from './women'
import LinkBtn from '@/components/buttons/link_btn'
import Link from 'next/link'

export default function Men() {
    return (
        <CutomerServices>
            <h1 className="mb-6 font_gotham_bold text-sm md:text-lg xl:text-xl tracking-vast">Men' Size</h1>
            <SizeTableAccordian title='Tops, Outerwear, Casual Shirts' headingTracking_null tableHeading='Urban Alpha Size' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                columnHeadings={['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']}
                rowsData={[
                    ['UK/IE Size', 34, '36 - 38', 40, 42, 44, 46, 48],
                    ['US Size', 34, '36 - 38', 40, 42, 44, 46, 48],
                    ['EU Size', 44, '46 - 48', 50, 52, 54, 56, 58],
                    ['FR Size', '44R', '46R - 48R', '50R', '52R', '54R', '56R', '58R'],
                    ['Chest', { CM: '88 - 92', INCH: '34⅗ - 36⅕' }, { CM: '93 - 97', INCH: '36⅗ - 38⅕' }, { CM: '98 - 102', INCH: '38⅗ - 40⅕' }, { CM: '103 - 108', INCH: '40⅗ - 42½' }, { CM: '109 - 114', INCH: '42⅞ - 44⅞' }, { CM: '115 - 120', INCH: '45⅓ - 47⅕' }, { CM: '121 - 126', INCH: '47⅗ - 49⅗' }],
                    ['Waist', { CM: '78 - 82', INCH: '30⅔ - 32⅓' }, { CM: '83 - 87', INCH: '32⅔ - 34⅓' }, { CM: '88 - 92', INCH: '34⅗ - 36⅕' }, { CM: '93 - 98', INCH: '36⅗ - 38⅗' }, { CM: '99 - 104', INCH: '39 - 40⅞' }, { CM: '105 - 110', INCH: '41⅓ - 43⅓' }, { CM: '111 - 116', INCH: '43⅔ - 45⅔' }],
                    ['Arms', { CM: '84 - 85', INCH: '33⅛ - 33½' }, { CM: '86 - 87', INCH: '33⅞ - 34⅓' }, { CM: '88 - 89', INCH: '34⅗ - 35' }, { CM: '90 - 91', INCH: '35⅖ - 35⅘' }, { CM: '92 - 93', INCH: '36⅕ - 36⅗' }, { CM: '94 - 95', INCH: '37 - 37⅖' }, { CM: '96 - 97', INCH: '37⅘ - 38⅕' }],
                    ['Necks', { CM: '37 - 38', INCH: '14⅗ - 15' }, { CM: '38 - 39', INCH: '15 - 15⅖' }, { CM: '40 - 41', INCH: '15⅔ - 16⅛' }, { CM: '42 - 43', INCH: '16½ - 16⅞' }, { CM: '44 - 45', INCH: '17⅓ - 17⅔' }, { CM: '45 - 46', INCH: '17⅔ - 18⅛' }, { CM: '46 - 47', INCH: '18⅛ - 18½' }]
                ]}>
                <div className="hidden md:flex sticky left-0 gap-4">
                    <LinkBtn href='product/t-shirts' bg='bg-gold' font='font_gotham_medium' fontSize='text-xs' classes='w-36' >SHOP T-SHIRTS</LinkBtn>
                    <LinkBtn href='product/shirts' bg='bg-gold' font='font_gotham_medium' fontSize='text-xs' classes='w-36' >SHOP SHIRTS</LinkBtn>
                </div>
                <div className="md:hidden btn_width my-4 sticky left-0 flex justify-between">
                    <div className='w-[45%] h-[38px] p-[1px] bg-gold rounded-md' >
                        <Link href='product/t-shirts' >
                            <div className='w-full h-full bg-white rounded-[5px] flex justify-center items-center font_gotham_medium text-[10px] tracking-vast' >SHOP T-SHIRTS</div>
                        </Link>
                    </div>
                    <div className='w-[45%] h-[38px] p-[1px] bg-gold rounded-md' >
                        <Link href='product/t-shirts' >
                            <div className='w-full h-full bg-white rounded-[5px] flex justify-center items-center font_gotham_medium text-[10px] tracking-vast' >SHOP SHIRTS</div>
                        </Link>
                    </div>
                </div>
            </SizeTableAccordian>
            <SizeTableAccordian title='Urban Menswear and the Sports - Bottoms - Denim - Chino - Shorts.' headingTracking_null tableHeading='Urban Alpha Size' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                columnHeadings={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
                rowsData={[
                    ['UK/IE Size', 32, 34, '36 - 38', 40, 42, 44, 46],
                    ['US Size', 32, 34, '36 - 38', 40, 42, 44, 46],
                    ['EU Size', 42, 44, '46 - 48', 50, 52, 54, 56],
                    ['FR Size', '42R', '44R', '46R - 48R', '50R', '52R', '54R', '56R'],
                    ['Waist', { CM: '74 - 76', INCH: '29⅛ - 29⅞' }, { CM: '77 - 81', INCH: '30⅓ - 31⅞' }, { CM: '82 - 86', INCH: '32⅓ - 33⅞' }, { CM: '86 - 90', INCH: '33⅞ - 35⅖' }, { CM: '91 - 96', INCH: '35⅘ - 37⅘' }, { CM: '97 - 101', INCH: '38⅕ - 39⅘' }, { CM: '102 - 106', INCH: '40⅕ - 41⅔' }],
                    ['Hips', { CM: '84 - 86', INCH: '33⅛ - 33⅞' }, { CM: '87 - 91', INCH: '34⅓ - 35⅘' }, { CM: '92 - 97', INCH: '36⅕ - 38⅕' }, { CM: '97 - 102', INCH: '38⅕ - 40⅕' }, { CM: '103 - 108', INCH: '40⅗ - 42½' }, { CM: '109 - 113', INCH: '42⅞ - 44½' }, { CM: '114 - 118', INCH: '44⅞ - 46½' }],
                    ['Tights', { CM: '51 - 52', INCH: '20⅛ - 20½' }, { CM: '52 - 54', INCH: '20½ - 21⅓' }, { CM: '54 - 56', INCH: '21⅓ - 22' }, { CM: '56 - 58', INCH: '22 - 22⅘' }, { CM: '58 - 60', INCH: '22⅘ - 23⅗' }, { CM: '60 - 62', INCH: '23⅗ - 24⅖' }, { CM: '62 - 64', INCH: '24⅖ - 25⅕' }],
                    ['Urban Inch Size', { CM: 28, INCH: 11 }, { CM: '29/2 - 30/2', INCH: '11⅖ - 11⅘' }, { CM: '31 - 32', INCH: '12⅕ - 12⅗' }, { CM: '33 - 34', INCH: '13 - 13⅖' }, { CM: '35 - 36', INCH: '13⅘ - 14⅕' }, { CM: '38', INCH: '15' }, { CM: '40', INCH: '15⅔' }]
                ]}>
                <TableButton href='/products/Jeans' >Shop Jeans</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Inseam Lengths' tableHeading='Label' indexColWidth='w-32' restColsWidth='w-24' unitBtns={null}
                columnHeadings={['Size', 'Insie Leg']}
                rowsData={[
                    ['Crop', 28, '71cm'],
                    ['Short', 30, '76cm'],
                    ['Regular', 32, '81cm'],
                    ['Tall', 34, '86cm'],
                    ['X-Tall', 36, '91cm']
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Swimshorts, Lounge Bottoms, Underwear.' headingTracking_null tableHeading='Label (XS - XXL)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[10%]'
                columnHeadings={['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']}
                rowsData={[
                    ['UK + US Size', 38, 40, 42, 44, 46, 48, 50, 52],
                    ['EU Size', 48, 50, 52, 54, 56, 58, 60, 62],
                    ['Waist', { CM: '81-85', INCH: '31⅞ - 33½' }, { CM: '86-91', INCH: '33⅞ - 35⅘' }, { CM: '92-97', INCH: '36⅕ - 38⅕' }, { CM: '98-103', INCH: '38⅗ - 40⅗' }, { CM: '104-109', INCH: '40⅞ - 42⅞' }, { CM: '110-115', INCH: '45⅔ - 47⅗' }, { CM: '116-121', INCH: '45⅔ - 47⅗' }, { CM: '122-127', INCH: '48 - 50' }],
                    ['Hips', { CM: '93-97', INCH: '36⅗ - 38⅕' }, { CM: '98-103', INCH: '38⅗ - 40⅗' }, { CM: '104-109', INCH: '40⅞ - 42⅞' }, { CM: '110-115', INCH: '43⅓ - 45⅓' }, { CM: '116-121', INCH: '45⅔ - 47⅗' }, { CM: '122-127', INCH: '48 - 50' }, { CM: '128-133', INCH: '50⅖ - 52⅖' }, { CM: '134-139', INCH: '52⅘ - 54⅔' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Beachcover Ups and Lounge Tops.' headingTracking_null tableHeading='Label (XS - XXL)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[10%]'
                columnHeadings={['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']}
                rowsData={[
                    ['UK + US Size', 38, 40, 42, 44, 46, 48, 50, 52],
                    ['EU Size', 48, 50, 52, 54, 56, 58, 60, 62],
                    ['Chest', { CM: '94-98', INCH: '37 - 38⅗' }, { CM: '99-104', INCH: '39 - 40⅞' }, { CM: '105-110', INCH: '41⅓ - 43⅓' }, { CM: '111-116', INCH: '43⅔ - 45⅔' }, { CM: '117-122', INCH: '46⅛ - 48' }, { CM: '123-128', INCH: '48⅖ - 50⅖' }, { CM: '129-134', INCH: '50⅘ - 52⅘' }, { CM: '135-140', INCH: '53⅛ - 55⅛' }],
                    ['Waist', { CM: '81-85', INCH: '31⅞ - 33½' }, { CM: '86-91', INCH: '33⅞ - 35⅘' }, { CM: '92-97', INCH: '36⅕ - 38⅕' }, { CM: '98-103', INCH: '38⅗ - 40⅗' }, { CM: '104-109', INCH: '40⅞ - 42⅞' }, { CM: '110-115', INCH: '45⅔ - 47⅗' }, { CM: '116-121', INCH: '45⅔ - 47⅗' }, { CM: '122-127', INCH: '48 - 50' }],
                    ['Hips', { CM: '93-97', INCH: '36⅗ - 38⅕' }, { CM: '98-103', INCH: '38⅗ - 40⅗' }, { CM: '104-109', INCH: '40⅞ - 42⅞' }, { CM: '110-115', INCH: '43⅓ - 45⅓' }, { CM: '116-121', INCH: '45⅔ - 47⅗' }, { CM: '122-127', INCH: '48 - 50' }, { CM: '128-133', INCH: '50⅖ - 52⅖' }, { CM: '134-139', INCH: '52⅘ - 54⅔' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Pajama Sets' headingTracking_null tableHeading='Label (XS - XXL)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[10%]'
                columnHeadings={['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']}
                rowsData={[
                    ['UK + US Size', 38, 40, 42, 44, 46, 48, 50, 52],
                    ['EU Size', 48, 50, 52, 54, 56, 58, 60, 62],
                    ['Chest', { CM: '94-98', INCH: '37 - 38⅗' }, { CM: '99-104', INCH: '39 - 40⅞' }, { CM: '105-110', INCH: '41⅓ - 43⅓' }, { CM: '111-116', INCH: '43⅔ - 45⅔' }, { CM: '117-122', INCH: '46⅛ - 48' }, { CM: '123-128', INCH: '48⅖ - 50⅖' }, { CM: '129-134', INCH: '50⅘ - 52⅘' }, { CM: '135-140', INCH: '53⅛ - 55⅛' }],
                    ['Waist', { CM: '81-85', INCH: '31⅞ - 33½' }, { CM: '86-91', INCH: '33⅞ - 35⅘' }, { CM: '92-97', INCH: '36⅕ - 38⅕' }, { CM: '98-103', INCH: '38⅗ - 40⅗' }, { CM: '104-109', INCH: '40⅞ - 42⅞' }, { CM: '110-115', INCH: '45⅔ - 47⅗' }, { CM: '116-121', INCH: '45⅔ - 47⅗' }, { CM: '122-127', INCH: '48 - 50' }],
                    ['Hips', { CM: '93-97', INCH: '36⅗ - 38⅕' }, { CM: '98-103', INCH: '38⅗ - 40⅗' }, { CM: '104-109', INCH: '40⅞ - 42⅞' }, { CM: '110-115', INCH: '43⅓ - 45⅓' }, { CM: '116-121', INCH: '45⅔ - 47⅗' }, { CM: '122-127', INCH: '48 - 50' }, { CM: '128-133', INCH: '50⅖ - 52⅖' }, { CM: '134-139', INCH: '52⅘ - 54⅔' }]
                ]}>
            </SizeTableAccordian>
            <SizeTableAccordian title='Shoes' headingTracking_null tableHeading={null} indexColWidth='w-32' restColsWidth='w-16'
                unitBtns={null} containerWidth='2xl:w-full' columnHeadings={[]}
                rowsData={[
                    ['US Size', 6.5, 7, 7.5, 8, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11, 11.5, 12, 12, 12.5, 13, 13.5, 14],
                    ['UK Size', 5.5, 6, 6.5, 7, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10, 10.5, 11, 11, 11.5, 12, 12.5, 13],
                    ['EU Size', 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47, 47.5, 48],
                    ['CM*', 24, 24.5, 25, 25.5, 26, 26, 26.5, 27, 27.5, 27.5, 28, 28.5, 29, 29.5, 29.5, 30, 30.5, 31, 31.5],
                    ['INCH*', 9.5, 9.5, 10, 10, 10.25, 10.25, 10.5, 10.5, 10.75, 10.75, 11, 11.25, 11.5, 11.5, 11.75, 11.75, 12, 12.25, 12.25]
                ]}>
                <TableButton href='/products/Jeans' >Shop Shoes</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Socks' tableHeading='Label' indexColWidth='w-32' restColsWidth='w-28' unitBtns={null}
                containerWidth='w-full' columnHeadings={['39 / 42', '43 / 46']}
                rowsData={[
                    ['Shoe Size', '39', '43'],
                    ['Foot Length Cm', '24.4 - 27', '27.1 - 29.7']
                ]} />
            <SizeTableAccordian title='Belts' tableHeading='Size' indexColWidth='w-24' restColsWidth='w-16' unitBtns={null}
                columnHeadings={['S - M', 'L - XL']} rowsData={[['CM', '70cm', '80cm']]}>
            </SizeTableAccordian>
            <h1 className="mt-20 lg:mt-28 mb-6 font_gotham_bold text-sm md:text-lg xl:text-xl tracking-vast">Tailored</h1>
            <SizeTableAccordian title='Suits, Coats, Business Shirts.' headingTracking_null tableHeading='Urban Alpha Size' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[10%]'
                bigFontOf_nthRow={[9]} columnHeadings={['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', '4XL']}
                rowsData={[
                    ['UK/IE Size', 34, 36, 38, 40, 42, 44, 46, 48],
                    ['US Size', 34, 36, 38, 40, 42, 44, 46, 48],
                    ['EU Size', 44, 46, 48, 50, 52, 54, 56, 58],
                    ['FR Size', '44R', '46R', '48R', '50R', '52R', '54R', '56R', '58R'],
                    ['Chest', { CM: '88 - 92', INCH: '34⅗ - 36⅕' }, { CM: '93 - 95', INCH: '36⅗ - 37⅖' }, { CM: '96 - 98', INCH: '37⅘ - 38⅗' }, { CM: '99 - 102', INCH: '39 - 40⅕' }, { CM: '103 - 106', INCH: '40⅗ - 41⅔' }, { CM: '107 - 111', INCH: '42⅛ - 43⅔' }, { CM: '112 - 116', INCH: '44⅛ - 45⅔' }, { CM: '117 - 121', INCH: '46⅛ - 47⅗' }],
                    ['Waist', { CM: '76 - 78', INCH: '29⅞ - 30⅔' }, { CM: '79 - 81', INCH: '31⅛ - 31⅞' }, { CM: '82 - 84', INCH: '32⅓ - 33⅛' }, { CM: '85 - 88', INCH: '33½ - 34⅗' }, { CM: '89 - 92', INCH: '35 - 36⅕' }, { CM: '93 - 97', INCH: '36⅗ - 38⅕' }, { CM: '98 - 102', INCH: '38⅗ - 40⅕' }, { CM: '103 - 107', INCH: '40⅗ - 42⅛' }],
                    ['Low Waist', { CM: '78 - 80', INCH: '30⅔ - 31½' }, { CM: '81 - 83', INCH: '31⅞ - 32⅔' }, { CM: '84 - 86', INCH: '33⅛ - 33⅞' }, { CM: '87 - 90', INCH: '34⅓ - 35⅖' }, { CM: '91 - 94', INCH: '35⅘ - 37' }, { CM: '95 - 99', INCH: '37⅖ - 39' }, { CM: '100 - 104', INCH: '39⅖ - 40⅞' }, { CM: '105 - 109', INCH: '41⅓ - 42⅞' }],
                    ['Hips', { CM: '88 - 91', INCH: '34⅗ - 35⅘' }, { CM: '92 - 94', INCH: '36⅕ - 37' }, { CM: '95 - 97', INCH: '37⅖ - 38⅕' }, { CM: '98 - 101', INCH: '38⅗ - 39⅘' }, { CM: '102 - 105', INCH: '40⅕ - 41⅓' }, { CM: '106 - 110', INCH: '41⅔ - 43⅓' }, { CM: '111 - 115', INCH: '43⅔ - 45⅓' }, { CM: '116 - 120', INCH: '45⅔ - 47⅕' }],
                    ['Arms', { CM: '61 - 62', INCH: '24 - 24⅖' }, { CM: '63 - 64', INCH: '24⅘ - 25⅕' }, { CM: '64 - 65', INCH: '25⅕ - 25⅗' }, { CM: '65 - 66', INCH: '25⅗ - 26' }, { CM: '66 - 67', INCH: '26 - 26⅖' }, { CM: '67 - 68', INCH: '26⅖ - 26⅘' }, { CM: '68 - 69', INCH: '26⅘ - 27⅕' }, { CM: '69 - 70', INCH: '27⅕ - 27⅗' }],
                    ['Inseam', { CM: 83, INCH: '32⅔' }, { CM: 84, INCH: '33⅛' }, { CM: 85, INCH: '33½' }, { CM: 86, INCH: '33⅞' }, { CM: 87, INCH: '34⅓' }, { CM: 88, INCH: '34⅗' }, { CM: 89, INCH: '35' }, { CM: 90, INCH: '35⅖' }]
                ]} />
            <SizeTableAccordian title='Long Length Sizes (185 cm - 192 cm) - Suits - Coats - Shirts.' headingTracking_null tableHeading='Urban Alpha Size' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[16%]'
                bigFontOf_nthRow={[9]} columnHeadings={['S', 'M', 'L', 'XL', 'XXL']}
                rowsData={[
                    ['UK/IE Size', '38 long', '40 long', '42 long', '44 long', '46 long'],
                    ['US Size', '38 long', '40 long', '42 long', '44 long', '46 long'],
                    ['EU Size', 94, 98, 102, 106, 110],
                    ['FR Size', '48 long', '50 long', '52 long', '54 long', '56 long'],
                    ['Chest', { CM: '95 - 97', INCH: '37⅖ - 38⅕' }, { CM: '97 - 101', INCH: '38⅕ - 39⅘' }, { CM: '102 - 105', INCH: '40⅕ - 41⅓' }, { CM: '106 - 110', INCH: '41⅔ - 43⅓' }, { CM: '111 - 115', INCH: '43⅔ - 45⅓' }],
                    ['Waist', { CM: '81 - 83', INCH: '31⅞ - 32⅔' }, { CM: '84 - 87', INCH: '33⅛ - 34⅓' }, { CM: '88 - 91', INCH: '34⅗ - 35⅘' }, { CM: '92 - 96', INCH: '36⅕ - 37⅘' }, { CM: '97 - 101', INCH: '38⅕ - 39⅘' }],
                    ['Low Waist', { CM: '83 - 85', INCH: '32⅔ - 33½' }, { CM: '86 - 89', INCH: '33⅞ - 35' }, { CM: '90 - 93', INCH: '35⅖ - 36⅗' }, { CM: '94 - 98', INCH: '37 - 38⅗' }, { CM: '99 - 103', INCH: '39 - 40⅗' }],
                    ['Hips', { CM: '94 - 96', INCH: '37 - 37⅘' }, { CM: '97 - 100', INCH: '38⅕ - 39⅖' }, { CM: '101 - 104', INCH: '39⅘ - 40⅞' }, { CM: '105 - 109', INCH: '41⅓ - 42⅞' }, { CM: '110 - 114', INCH: '43⅓ - 44⅞' }],
                    ['Arms', { CM: '66 - 67', INCH: '26 - 26⅖' }, { CM: '68 - 69', INCH: '26⅘ - 27⅕' }, { CM: '69 - 70', INCH: '27⅕ - 27⅗' }, { CM: '70 - 71', INCH: '27⅗ - 28' }, { CM: '71 - 72', INCH: '28 - 28⅓' }],
                    ['Inseam', { CM: 89, INCH: '35' }, { CM: 90, INCH: '35⅖' }, { CM: 91, INCH: '35⅘' }, { CM: 92, INCH: '36⅕' }, { CM: 93, INCH: '36⅗' }]
                ]} />
            <SizeTableAccordian title='Short Length Sizes (Less Than 175 cm) - Suits - Coats - Shirts.' headingTracking_null tableHeading='Label (XS - XXL)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[16%]'
                bigFontOf_nthRow={[9]} columnHeadings={['S', 'M', 'L', 'XL', 'XXL']}
                rowsData={[
                    ['UK/IE Size', '38 short', '40 short', '42 short', '44 short', '46 short'],
                    ['US Size', '38 short', '40 short', '42 short', '44 short', '46 short'],
                    ['EU Size', 24, 25, 26, 27, 28],
                    ['FR Size', '48 short', '50 short', '52 short', '54 short', '56 short'],
                    ['Chest', { CM: '100 - 102', INCH: '39⅖ - 40⅕' }, { CM: '103 - 105', INCH: '40⅗ - 41⅓' }, { CM: '106 - 109', INCH: '41⅔ - 42⅞' }, { CM: '110 - 114', INCH: '43⅓ - 44⅞' }, { CM: '115 - 119', INCH: '45⅓ - 46⅞' }],
                    ['Waist', { CM: '86 - 89', INCH: '33⅞ - 35' }, { CM: '90 - 93', INCH: '35⅖ - 36⅗' }, { CM: '94 - 97', INCH: '37 - 38⅕' }, { CM: '98 - 102', INCH: '38⅗ - 40⅕' }, { CM: '103 - 107', INCH: '40⅗ - 42⅛' }],
                    ['Low Waist', { CM: '83 - 85', INCH: '33½ - 34⅗' }, { CM: '89 - 92', INCH: '35 - 36⅕' }, { CM: '93 - 96', INCH: '36⅗ - 37⅘' }, { CM: '97 - 101', INCH: '38⅕ - 39⅘' }, { CM: '102 - 106', INCH: '40⅕ - 41⅔' }],
                    ['Hips', { CM: '97 - 100', INCH: '38⅕ - 39⅖' }, { CM: '101 - 104', INCH: '39⅘ - 40⅞' }, { CM: '105 - 108', INCH: '41⅓ - 42½' }, { CM: '109 - 113', INCH: '42⅞ - 44½' }, { CM: '114 - 118', INCH: '44⅞ - 46½' }],
                    ['Arms', { CM: '60 - 62', INCH: '23⅗ - 24⅖' }, { CM: '61 - 62', INCH: '24 - 24⅖' }, { CM: '63 - 64', INCH: '24⅘ - 25⅕' }, { CM: '64 - 65', INCH: '25⅕ - 25⅗' }, { CM: '65 - 66', INCH: '25⅗ - 26' }],
                    ['Inseam', { CM: 82, INCH: '32⅓' }, { CM: 83, INCH: '32⅔' }, { CM: 84, INCH: '33⅛' }, { CM: 85, INCH: '33½' }, { CM: 86, INCH: '33⅞' }]
                ]} />
            <h1 className="mt-20 lg:mt-28 mb-6 font_gotham_bold text-sm md:text-lg xl:text-xl tracking-vast">Urban Jeans Sizes</h1>
            <SizeTableAccordian title='Sweaters, T-Shirts, Other Knits, Outer Wear.' headingTracking_null tableHeading='Label (XS - XXL)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.33%]'
                bigFontOf_nthRow={[9]} columnHeadings={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                rowsData={[
                    ['UK + US Size', 34, 36, 38, 40, 42, 42],
                    ['IT + FR', '44R', '46R', '48R', '50R', '52R', '54R'],
                    ['EU Size', '44R', '46R', '48R', '50R', '52R', '54R'],
                    ['Chest', { CM: '88 - 92', INCH: '34⅗ - 36⅕' }, { CM: '93 - 97', INCH: '36⅗ - 38⅕' }, { CM: '98 - 102', INCH: '38⅗ - 40⅕' }, { CM: '103 - 108', INCH: '40⅗ - 42½' }, { CM: '109 - 114', INCH: '42⅞ - 44⅞' }, { CM: '115 - 120', INCH: '45⅓ - 47⅕' }],
                    ['Sleeve', { CM: 61, INCH: '24' }, { CM: 62.5, INCH: '24⅗' }, { CM: 64, INCH: '25⅕' }, { CM: 65.5, INCH: '25⅘' }, { CM: 67, INCH: '26⅖' }, { CM: 68.5, INCH: '27' }],
                    ['Arms', { CM: '84 - 85', INCH: '33⅛ - 33½' }, { CM: '86 - 87', INCH: '33⅞ - 34⅓' }, { CM: '88 - 89', INCH: '34⅗ - 35' }, { CM: '90 - 91', INCH: '35⅖ - 35⅘' }, { CM: '92 - 93', INCH: '36⅕ - 36⅗' }, { CM: '94 - 95', INCH: '37 - 37⅖' }]
                ]}>
                <TableButton href='/products/Jeans' classes='w-48' >Shop Urban Jeans</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Shorts, Pants' headingTracking_null tableHeading='Label (XS - XXL)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.33%]'
                unitBtns={null} columnHeadings={['XS', 'S', 'M', 'L', 'XL', 'XXL']}
                rowsData={[
                    ['UK + US Size', 34, 36, 38, 40, 42, 42],
                    ['IT + FR', 44, 46, 48, 50, 52, 54],
                    ['EU Size', 44, 46, 48, 50, 52, 54],
                    ['Chest', 82, 86, 90, 94, 98, 102],
                    ['Sleeve', 93.5, 97.5, 101.5, 105.5, 109.5, 113.5],
                    ['Arms', 81, 81.5, 82, 82.5, 83, 83.5]
                ]} />
            <SizeTableAccordian title='Inseam Lengths' tableHeading='Label' headingTracking_null indexColWidth='w-32' restColsWidth='w-28' unitBtns={null}
                containerWidth='w-full' columnHeadings={['Size', 'Inside Leg']}
                rowsData={[
                    ['Short', 30, '76 cm'],
                    ['Regular', 32, '81 cm'],
                    ['Tall', 34, '86 cm'],
                    ['X-Tall', 36, '91 cm']
                ]} />
            <h1 className="mt-20 lg:mt-28 mb-6 font_gotham_bold text-sm md:text-lg xl:text-xl tracking-vast">Urbanfits Big & Tall / Urban Jeans Plus.</h1>
            <SizeTableAccordian title='Urbanfits Big and Tall / Urban Jeans Plus - Size Conversions.' tableHeading='Alpha Size' headingTracking_null indexColWidth='w-32 sm:w-1/5' restColsWidth='w-28 sm:w-[13.3%]' unitBtns={null}
                containerWidth='w-full' columnHeadings={['XLT', '2XLT', '3XLT', '4XLT', '5XLT', 'XXL']}
                rowsData={[
                    ['Urban/Inch', 42, 44, 46, 48, 50, 42]
                ]} />
            <SizeTableAccordian title="Urbanfits Men's Big and Tall / Urban Jeans Plus - Tops - Outerwear - Shirts - Sweaters." tableHeading='Alpha Size' headingTracking_null indexColWidth='w-32 sm:w-1/5' restColsWidth='w-28 sm:w-[16%]' unitBtns={null}
                containerWidth='w-full' columnHeadings={['XLT', '2XLT', '3XLT', '4XLT', '5XLT']}
                rowsData={[
                    ['Chest', '123 - 127', '128 - 132', '133 - 137', '138 - 142', '143 - 147'],
                    ['Arms', '94 - 95', '95 - 96', '97 - 98', '99 - 100', '101 - 102']
                ]} />
            <SizeTableAccordian title="Urbanfits Men's Big and Tall / Urban Jeans Plus - Bottoms - Denim - Chino - Shorts." tableHeading='Alpha Size' headingTracking_null indexColWidth='w-32 sm:w-1/5' restColsWidth='w-28 sm:w-[16%]' unitBtns={null}
                containerWidth='w-full' columnHeadings={['XLT', '2XLT', '3XLT', '4XLT', '5XLT']}
                rowsData={[
                    ['Waist', '110 - 114', '115 - 119', '120 - 124', '125 - 128', '129 - 134'],
                    ['Hips', '115 - 119', '120 - 124', '125 - 129', '130 - 134', '135 - 139'],
                    ['Thighs', '66 - 67', '68 - 70', '71 - 73', '74 - 76', '77 - 79']
                ]} />
            <HelpSection />
        </CutomerServices>
    )
}
