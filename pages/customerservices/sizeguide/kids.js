import React from 'react'
import CutomerServices from '../index'
import SizeTableAccordian from '@/components/accordians/sizeTable-accordian'
import { TableButton, HelpSection } from './women'
import LinkBtn from '@/components/buttons/link_btn'
import Link from 'next/link'

export default function Kids() {
    return (
        <CutomerServices>
            <h1 className="mb-6 font_gotham_bold text-sm md:text-lg xl:text-xl tracking-vast">Kids' Size</h1>
            <SizeTableAccordian title='Infant - Clothing' headingTracking_null tableHeading='EU Size (years)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[10%]'
                bigFontOf_nthRow={[1, 2, 3, 4, 5, 6]} columnHeadings={['PRE44', 'PRE50', 'NB', '3M', '6M', '9M', '12M', '18M']}
                rowsData={[
                    ['EU Size (cm)', 44, 50, 56, 62, 68, 74.25, 80.25, 86, 92],
                    ['Sholders', { CM: 13.75, INCH: '5⅖' }, { CM: 15.75, INCH: '6⅕' }, { CM: 17, INCH: '6⅔' }, { CM: 22.5, INCH: '7⅕' }, { CM: 18.25, INCH: '7⅗' }, { CM: 19.25, INCH: '8⅛' }, { CM: 20.5, INCH: '8½' }, { CM: 23.75, INCH: '8⅞' }, { CM: 21.5, INCH: '9⅖' }],
                    ['Chest', { CM: 31.75, INCH: '12½' }, { CM: 36, INCH: '14⅕' }, { CM: 38.5, INCH: '15⅕' }, { CM: 50.75, INCH: '16⅞' }, { CM: 43, INCH: '17⅞' }, { CM: 45.5, INCH: '18½' }, { CM: 47, INCH: '19½' }, { CM: 52.5, INCH: '20' }, { CM: 49.5, INCH: '20' }],
                    ['Neck', { CM: 17.25, INCH: '6⅘' }, { CM: 15.75, INCH: '7⅔' }, { CM: 21.25, INCH: '8⅖' }, { CM: 24.5, INCH: '8⅔' }, { CM: 22, INCH: '8⅞' }, { CM: 22.5, INCH: '9⅓' }, { CM: 23.5, INCH: '9⅖' }, { CM: 25, INCH: '9⅗' }, { CM: 24, INCH: '9⅗' }],
                    ['Inseam', { CM: 15, INCH: '5⅞' }, { CM: 15, INCH: '5⅞' }, { CM: 17, INCH: '8⅖' }, { CM: 31.25, INCH: '7⅗' }, { CM: 19.25, INCH: '8⅗' }, { CM: 21.75, INCH: '9½' }, { CM: 24.25, INCH: '10⅗' }, { CM: 34.5, INCH: '12⅓' }, { CM: 27, INCH: '13⅗' }],
                    ['Waist', { CM: 31.75, INCH: '12½' }, { CM: 36, INCH: '5⅞' }, { CM: 38.75, INCH: '15⅓' }, { CM: 49.75, INCH: '16⅞' }, { CM: 43, INCH: '17⅔' }, { CM: 45, INCH: '18⅓' }, { CM: 46.5, INCH: '19⅕' }, { CM: 50.5, INCH: '19⅗' }, { CM: 48.75, INCH: '19⅗' }],
                    ['Low Hips', { CM: 30, INCH: '11⅘' }, { CM: 34, INCH: '5⅞' }, { CM: 37, INCH: '14⅗' }, { CM: 51.5, INCH: '16½' }, { CM: 42, INCH: '17⅗' }, { CM: 44.75, INCH: '18⅔' }, { CM: 47.5, INCH: '19⅔' }, { CM: 53, INCH: '20⅓' }, { CM: 50, INCH: '20⅓' }]
                ]}>
                <TableButton href='/products/babies' classes='w-56' >Shop Babies Collection</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Boys - Clothing' headingTracking_null tableHeading='EU Size (years)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[8%]'
                bigFontOf_nthRow={[1, 2, 3, 4, 5, 6]} columnHeadings={[3, 4, 5, 6, 7, '8 - 9', '10 - 11', '12 - 13', '14 - 15', 16]}
                rowsData={[
                    ['EU Size (cm)', 98, 104, 110, 116, 122, 128, 140, 152, 164, 176],
                    ['Sholders', { CM: 24.25, INCH: '9½' }, { CM: 25.5, INCH: '10' }, { CM: 25.75, INCH: '10⅛' }, { CM: 27, INCH: '10⅗' }, { CM: 27.75, INCH: '10⅞' }, { CM: 29, INCH: '11⅖' }, { CM: 30.75, INCH: '12⅛' }, { CM: 33.5, INCH: '13⅕' }, { CM: 35.75, INCH: '14⅛' }, { CM: 37, INCH: '14⅗' }],
                    ['Chest', { CM: 54.25, INCH: '21⅖' }, { CM: 56, INCH: '22' }, { CM: 58, INCH: '22⅘' }, { CM: 60.5, INCH: '23⅘' }, { CM: 63, INCH: '24⅘' }, { CM: 64, INCH: '25⅕' }, { CM: 71, INCH: '28' }, { CM: 78, INCH: '30⅔' }, { CM: 86, INCH: '33⅞' }, { CM: 91.5, INCH: '36' }],
                    ['Neck', { CM: 25.5, INCH: '10' }, { CM: 26, INCH: '10⅕' }, { CM: 26.5, INCH: '10⅖' }, { CM: 27.5, INCH: '10⅘' }, { CM: 28.5, INCH: '11⅕' }, { CM: 29.75, INCH: '11⅔' }, { CM: 31, INCH: '12⅕' }, { CM: 33, INCH: '13' }, { CM: 34.5, INCH: '13⅗' }, { CM: 37, INCH: '14⅗' }],
                    ['Inseam', { CM: 41, INCH: '16⅛' }, { CM: 45.5, INCH: '17⅞' }, { CM: 49.25, INCH: '19⅖' }, { CM: 52, INCH: '20½' }, { CM: 56, INCH: '22' }, { CM: 59.25, INCH: '23⅓' }, { CM: 65, INCH: '25⅗' }, { CM: 70.05, INCH: '27⅗' }, { CM: 76.25, INCH: '30' }, { CM: 82, INCH: '32⅓' }],
                    ['Waist', { CM: 52.5, INCH: '20⅔' }, { CM: 54.5, INCH: '21½' }, { CM: 55, INCH: '21⅔' }, { CM: 56, INCH: '22' }, { CM: 57, INCH: '22⅖' }, { CM: 59, INCH: '23⅕' }, { CM: 63.5, INCH: '25' }, { CM: 68, INCH: '26⅘' }, { CM: 73, INCH: '28⅔' }, { CM: 76.25, INCH: '30' }],
                    ['Low Hips', { CM: 56, INCH: '22' }, { CM: 60, INCH: '21½' }, { CM: 62, INCH: '24⅖' }, { CM: 64, INCH: '25⅕' }, { CM: 66, INCH: '26' }, { CM: 68, INCH: '26⅘' }, { CM: 74.25, INCH: '29⅕' }, { CM: 81, INCH: '31⅞' }, { CM: 89, INCH: '35' }, { CM: 94, INCH: '37' }]
                ]}>
                <TableButton href='/products/babies' >SHOP BOYS</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Girls - Clothing' headingTracking_null tableHeading='EU Size (years)' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[8%]'
                bigFontOf_nthRow={[1, 2, 3, 4, 5, 6]} columnHeadings={[3, 4, 5, 6, 7, '8 - 9', '10 - 11', '12 - 13', '14 - 15', 16]}
                rowsData={[
                    ['EU Size (cm)', 98, 104, 110, 116, 122, 128, 140, 152, 164, 166],
                    ['Sholders', { CM: 24.25, INCH: '9½' }, { CM: 25.5, INCH: '10' }, { CM: 25.75, INCH: '10⅛' }, { CM: 27, INCH: '10⅗' }, { CM: 27.75, INCH: '10⅞' }, { CM: 28, INCH: '11⅖' }, { CM: 30.5, INCH: '12⅛' }, { CM: 33, INCH: '13⅕' }, { CM: 34.75, INCH: '14⅛' }, { CM: 35.25, INCH: '14⅗' }],
                    ['Chest', { CM: 54.25, INCH: '21⅖' }, { CM: 56, INCH: '22' }, { CM: 58, INCH: '22⅘' }, { CM: 60.5, INCH: '23⅘' }, { CM: 63, INCH: '24⅘' }, { CM: 'n/a', INCH: 'n/a' }, { CM: 'n/a', INCH: 'n/a' }, { CM: 'n/a', INCH: 'n/a' }, { CM: 'n/a', INCH: 'n/a' }, { CM: 'n/a', INCH: 'n/a' }],
                    ['Neck', { CM: 25.5, INCH: '10' }, { CM: 26, INCH: '10⅕' }, { CM: 26.5, INCH: '10⅖' }, { CM: 27.5, INCH: '10⅘' }, { CM: 28.5, INCH: '11⅕' }, { CM: 29.75, INCH: '11⅔' }, { CM: 30.75, INCH: '12⅕' }, { CM: 32.25, INCH: '13' }, { CM: 33, INCH: '13⅗' }, { CM: 34, INCH: '14⅗' }],
                    ['Inseam', { CM: 41, INCH: '16⅛' }, { CM: 45.5, INCH: '17⅞' }, { CM: 49.25, INCH: '19⅖' }, { CM: 52, INCH: '20½' }, { CM: 56, INCH: '22' }, { CM: 59.75, INCH: '23⅓' }, { CM: 65.75, INCH: '25⅗' }, { CM: 71.5, INCH: '27⅗' }, { CM: 77.5, INCH: '30' }, { CM: 78.5, INCH: '32⅓' }],
                    ['Waist', { CM: 52.5, INCH: '20⅔' }, { CM: 54.5, INCH: '21½' }, { CM: 55, INCH: '21⅔' }, { CM: 56, INCH: '22' }, { CM: 57, INCH: '22⅖' }, { CM: 58, INCH: '23⅕' }, { CM: 61.75, INCH: '25' }, { CM: 65.5, INCH: '26⅘' }, { CM: 67.25, INCH: '28⅔' }, { CM: 69, INCH: '30' }],
                    ['Low Hips', { CM: 56, INCH: '22' }, { CM: 60, INCH: '21½' }, { CM: 62, INCH: '24⅖' }, { CM: 64, INCH: '25⅕' }, { CM: 66, INCH: '26' }, { CM: 70, INCH: '26⅘' }, { CM: 77, INCH: '29⅕' }, { CM: 84, INCH: '31⅞' }, { CM: 88, INCH: '35' }, { CM: 92, INCH: '37' }]
                ]}>
                <TableButton href='/products/babies' >Shop Girls</TableButton>
            </SizeTableAccordian>
            <SizeTableAccordian title='Girls Beach Cover Ups Tops, Lounge Tops, Bras.' headingTracking_null tableHeading='Size / Age' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                bigFontOf_nthRow={[1, 2]} columnHeadings={['4 - 5', '6 - 7', '8 - 10', '10 - 12', '12 - 14', '14 - 16']}
                rowsData={[
                    ['Alpha Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    ['Height', { CM: '104 - 110', INCH: '40⅞ - 43⅓' }, { CM: '116 - 122', INCH: '45⅔ - 48' }, { CM: '128 - 140', INCH: '50⅖ - 55⅛' }, { CM: '140 - 152', INCH: '55⅛ - 59⅘' }, { CM: '152 - 164', INCH: '59⅘ - 64⅗' }, { CM: '164 - 176', INCH: '64⅗ - 69⅓' }],
                    ['Chest', { CM: '56 - 58', INCH: '22 - 22⅘' }, { CM: '60.5 - 63', INCH: '23⅘ - 24⅘' }, { CM: '65 - 71.5', INCH: '25⅗ - 28⅛' }, { CM: '71.5 - 78', INCH: '28⅛ - 30⅔' }, { CM: '78 - 82.5', INCH: '30⅔ - 32½' }, { CM: '82.5 - 87', INCH: '32½ - 34⅓' }]
                ]} />
            <SizeTableAccordian title='Girls Beach Cover Ups Bottoms, Lounge Bottoms, Underwear.' headingTracking_null tableHeading='Size / Age' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                bigFontOf_nthRow={[1, 2, 3]} columnHeadings={['4 - 5', '6 - 7', '8 - 10', '10 - 12', '12 - 14', '14 - 16']}
                rowsData={[
                    ['Alpha Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    ['Height', { CM: '104 - 110', INCH: '40⅞ - 43⅓' }, { CM: '116 - 122', INCH: '45⅔ - 48' }, { CM: '128 - 140', INCH: '50⅖ - 55⅛' }, { CM: '140 - 152', INCH: '55⅛ - 59⅘' }, { CM: '152 - 164', INCH: '59⅘ - 64⅗' }, { CM: '164 - 176', INCH: '64⅗ - 69⅓' }],
                    ['Hips', { CM: '60 - 62', INCH: '23⅗ - 24⅖' }, { CM: '64 - 66', INCH: '25⅕ - 26' }, { CM: '70 - 77', INCH: '27⅗ - 30⅓' }, { CM: '77 - 84', INCH: '30⅓ - 33⅛' }, { CM: '84 - 88', INCH: '33⅛ - 34⅗' }, { CM: '88 - 92', INCH: '34⅗ - 36⅕' }],
                    ['Waist', { CM: '54.5 - 55', INCH: '21½ - 21⅔' }, { CM: '56 - 57', INCH: '22 - 22⅖' }, { CM: '58 - 62', INCH: '22⅘ - 24⅖' }, { CM: '62 - 65.5', INCH: '24⅖ - 25⅘' }, { CM: '65.5 - 67', INCH: '25⅘ - 26⅖' }, { CM: '67 - 69', INCH: '26⅖ - 27⅕' }]
                ]} />
            <SizeTableAccordian title='Girls Pajama Sets, Bikini Sets, Bathing Suits.' headingTracking_null tableHeading='Size / Age' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                bigFontOf_nthRow={[1, 2, 3, 4]} columnHeadings={['4 - 5', '6 - 7', '8 - 10', '10 - 12', '12 - 14', '14 - 16']}
                rowsData={[
                    ['Alpha Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    ['Height', { CM: '104 - 110', INCH: '40⅞ - 43⅓' }, { CM: '116 - 122', INCH: '45⅔ - 48' }, { CM: '128 - 140', INCH: '50⅖ - 55⅛' }, { CM: '140 - 152', INCH: '55⅛ - 59⅘' }, { CM: '152 - 164', INCH: '59⅘ - 64⅗' }, { CM: '164 - 176', INCH: '64⅗ - 69⅓' }],
                    ['Chest', { CM: '56 - 58', INCH: '22 - 22⅘' }, { CM: '60.5 - 63', INCH: '23⅘ - 24⅘' }, { CM: '65 - 71.5', INCH: '25⅗ - 28⅛' }, { CM: '71.5 - 78', INCH: '28⅛ - 30⅔' }, { CM: '78 - 82.5', INCH: '30⅔ - 32½' }, { CM: '82.5 - 87', INCH: '32½ - 34⅓' }],
                    ['Hips', { CM: '60 - 62', INCH: '23⅗ - 24⅖' }, { CM: '64 - 66', INCH: '25⅕ - 26' }, { CM: '70 - 77', INCH: '27⅗ - 30⅓' }, { CM: '77 - 84', INCH: '30⅓ - 33⅛' }, { CM: '84 - 88', INCH: '33⅛ - 34⅗' }, { CM: '88 - 92', INCH: '34⅗ - 36⅕' }],
                    ['Waist', { CM: '54.5 - 55', INCH: '21½ - 21⅔' }, { CM: '56 - 57', INCH: '22 - 22⅖' }, { CM: '58 - 62', INCH: '22⅘ - 24⅖' }, { CM: '62 - 65.5', INCH: '24⅖ - 25⅘' }, { CM: '65.5 - 67', INCH: '25⅘ - 26⅖' }, { CM: '67 - 69', INCH: '26⅖ - 27⅕' }]
                ]} />
            <SizeTableAccordian title='Boys Beach Cover Up Tops, Lounge Tops.' headingTracking_null tableHeading='Size / Age' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                bigFontOf_nthRow={[1, 2]} columnHeadings={['4 - 5', '6 - 7', '8 - 10', '10 - 12', '12 - 14', '14 - 16']}
                rowsData={[
                    ['Alpha Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    ['Height', { CM: '104 - 110', INCH: '40⅞ - 43⅓' }, { CM: '116 - 122', INCH: '45⅔ - 48' }, { CM: '128 - 140', INCH: '50⅖ - 55⅛' }, { CM: '140 - 152', INCH: '55⅛ - 59⅘' }, { CM: '152 - 164', INCH: '59⅘ - 64⅗' }, { CM: '164 - 176', INCH: '64⅗ - 69⅓' }],
                    ['Chest', { CM: '56 - 58', INCH: '22 - 22⅘' }, { CM: '60.5 - 63', INCH: '23⅘ - 24⅘' }, { CM: '64 - 71', INCH: '25⅕ - 28' }, { CM: '71 - 78', INCH: '28 - 30⅔' }, { CM: '78 - 86', INCH: '30⅔ - 33⅞' }, { CM: '86 - 91.5', INCH: '33⅞ - 36' }]
                ]} />
            <SizeTableAccordian title='Boys Beach Cover Up Bottoms, Lounge Bottoms, Underwear Bottoms, Swimshorts.' headingTracking_null tableHeading='Size / Age' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                bigFontOf_nthRow={[1, 2, 3]} columnHeadings={['4 - 5', '6 - 7', '8 - 10', '10 - 12', '12 - 14', '14 - 16']}
                rowsData={[
                    ['Alpha Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    ['Height', { CM: '104 - 110', INCH: '40⅞ - 43⅓' }, { CM: '116 - 122', INCH: '45⅔ - 48' }, { CM: '128 - 140', INCH: '50⅖ - 55⅛' }, { CM: '140 - 152', INCH: '55⅛ - 59⅘' }, { CM: '152 - 164', INCH: '59⅘ - 64⅗' }, { CM: '164 - 176', INCH: '64⅗ - 69⅓' }],
                    ['Hips', { CM: '60 - 62', INCH: '23⅗ - 24⅖' }, { CM: '64 - 66', INCH: '25⅕ - 26' }, { CM: '68 - 74.5', INCH: '26⅘ - 29⅓' }, { CM: '74.5 - 81', INCH: '29⅓ - 31⅞' }, { CM: '81 - 89', INCH: '31⅞ - 35' }, { CM: '89 - 94', INCH: '35 - 37' }],
                    ['Waist', { CM: '54.5 - 55', INCH: '21½ - 21⅔' }, { CM: '56 - 57', INCH: '22 - 22⅖' }, { CM: '59 - 63.5', INCH: '23⅕ - 25' }, { CM: '63.5 - 68', INCH: '25 - 26⅘' }, { CM: '68 - 73', INCH: '26⅘ - 28⅔' }, { CM: '73 - 76.5', INCH: '28⅔ - 30⅛' }]
                ]} />
            <SizeTableAccordian title='Boys Pajama Sets' headingTracking_null tableHeading='Size / Age' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-[13.3%]'
                bigFontOf_nthRow={[1, 2, 3, 4]} columnHeadings={['4 - 5', '6 - 7', '8 - 10', '10 - 12', '12 - 14', '14 - 16']}
                rowsData={[
                    ['Alpha Sizes', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
                    ['Height', { CM: '104 - 110', INCH: '40⅞ - 43⅓' }, { CM: '116 - 122', INCH: '45⅔ - 48' }, { CM: '128 - 140', INCH: '50⅖ - 55⅛' }, { CM: '140 - 152', INCH: '55⅛ - 59⅘' }, { CM: '152 - 164', INCH: '59⅘ - 64⅗' }, { CM: '164 - 176', INCH: '64⅗ - 69⅓' }],
                    ['Chest', { CM: '56 - 58', INCH: '22 - 22⅘' }, { CM: '60.5 - 63', INCH: '23⅘ - 24⅘' }, { CM: '64 - 71', INCH: '25⅕ - 28' }, { CM: '71 - 78', INCH: '28 - 30⅔' }, { CM: '78 - 86', INCH: '30⅔ - 33⅞' }, { CM: '86 - 91.5', INCH: '33⅞ - 36' }],
                    ['Hips', { CM: '60 - 62', INCH: '23⅗ - 24⅖' }, { CM: '64 - 66', INCH: '25⅕ - 26' }, { CM: '68 - 74.5', INCH: '26⅘ - 29⅓' }, { CM: '74.5 - 81', INCH: '29⅓ - 31⅞' }, { CM: '81 - 89', INCH: '31⅞ - 35' }, { CM: '89 - 94', INCH: '35 - 37' }],
                    ['Waist', { CM: '54.5 - 55', INCH: '21½ - 21⅔' }, { CM: '56 - 57', INCH: '22 - 22⅖' }, { CM: '59 - 63.5', INCH: '23⅕ - 25' }, { CM: '63.5 - 68', INCH: '25 - 26⅘' }, { CM: '68 - 73', INCH: '26⅘ - 28⅔' }, { CM: '73 - 76.5', INCH: '28⅔ - 30⅛' }]
                ]} />
            <SizeTableAccordian title='Kids Bathrobes' headingTracking_null tableHeading='Size / Age' indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-1/5'
                bigFontOf_nthRow={[1, 2, 3, 4]} columnHeadings={['8 - 10', '10 - 12', '12 - 14', '14 - 16']}
                rowsData={[
                    ['Alpha Sizes', 'S', 'M', 'L', 'XL'],
                    ['Height', { CM: '128 - 140', INCH: '50⅖ - 55⅛' }, { CM: '140 - 152', INCH: '55⅛ - 59⅘' }, { CM: '152 - 164', INCH: '59⅘ - 64⅗' }, { CM: '164 - 170', INCH: '64⅗ - 66⅞' }],
                    ['Chest', { CM: '65 - 71', INCH: '25⅗ - 28' }, { CM: '71 - 78', INCH: '28 - 30⅔' }, { CM: '78 - 86', INCH: '30⅔ - 33⅞' }, { CM: '82.5 - 87', INCH: '32½ - 34⅓' }],
                    ['Waist', { CM: '58 - 63.5', INCH: '22⅘ - 25' }, { CM: '62 - 68', INCH: '24⅖ - 26⅘' }, { CM: '65.5 - 73', INCH: '25⅘ - 28⅔' }, { CM: '67 - 69', INCH: '26⅖ - 27⅕' }],
                    ['Hips', { CM: '68 - 77', INCH: '26⅘ - 30⅓' }, { CM: '74.5 - 84', INCH: '29⅓ - 33⅛' }, { CM: '81 - 89', INCH: '31⅞ - 35' }, { CM: '88 - 92', INCH: '34⅗ - 36⅕' }]
                ]} />
            <SizeTableAccordian title='Infant - Shoes' headingTracking_null tableHeading={null} indexColWidth='w-32' restColsWidth='w-16'
                unitBtns={null} bigFontOf_nthRow={[1, 2, 3, 4]} containerWidth='w-full' columnHeadings={[]}
                rowsData={[
                    ['US', 4, 4.5, 5, 5, 5.5, 5.5, 6, 6, 6.5, 7, 7.5, 7.5, 8, 8.5, 8.5, 9, 9.5],
                    ['UK', 3, 3.5, 4, 4.5, 5, 5, 5.5, 5.5, 6, 6.5, 7, 7, 7.5, 8, 8, 8.5, 9],
                    ['EU', 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5, 25, 25, 25.5, 26, 26.5],
                    ['CM*', 11.5, 12, 12.5, 12.5, 13, 13, 13.5, 13.5, 14, 14.5, 15, 15, 15.5, 16, 16, 16.5, 17],
                    ['INCH*', 4.5, 4.5, 4.75, 4.75, 5, 5, 5.25, 5.25, 5.5, 5.5, 6, 6, 6.25, 6.25, 6.5, 6.5, 6.75]
                ]} />
            <SizeTableAccordian title='Babies - Shoes' tableHeading={null} indexColWidth='w-32 md:w-1/5' restColsWidth='w-16 md:w-1/5'
                unitBtns={null} columnHeadings={[]}
                rowsData={[
                    ['US', 0.5, 1, 2, 3, 4],
                    ['UK', 0, 0.5, 1, 2, 3],
                    ['EU', 15, 16, 17, 18, 19],
                    ['CM*', 9, 9.5, 10, 11, 11.5],
                    ['INCH*', 3.5, 3.75, 4, 4.25, 4.5],
                ]} />
            <SizeTableAccordian title='Socks' tableHeading='Label' indexColWidth='w-32' restColsWidth='w-32' unitBtns={null}
                columnHeadings={['31 / 34', '35 / 38', '39 / 42']}
                rowsData={[
                    ['Shoe Size', '31', '35', '39'],
                    ['Foot Length', '17.9 - 21.4', '21.5 - 24.3', '24.4 - 27']
                ]} />
            <SizeTableAccordian title='Beanie' headingTracking_null tableHeading='Circumference' indexColWidth='w-36' restColsWidth='w-36' unitBtns={null}
                columnHeadings={['S - M', 'L - XL']}
                rowsData={[
                    ['1/2 Bottom Width', '18 cm', '21 cm'],
                    ['Height', '16.5 cm', '19.5 cm']
                ]} />
            <SizeTableAccordian title='Knitted Scarfs' headingTracking_null tableHeading='Measurement' indexColWidth='w-36' restColsWidth='w-36' unitBtns={null}
                columnHeadings={['S - M']}
                rowsData={[
                    ['Length', '132.5 cm'],
                    ['Width', '18 cm']
                ]} />
            <SizeTableAccordian title='Knitted Mittens' headingTracking_null tableHeading='Measurement' indexColWidth='w-48 ' restColsWidth='w-36' unitBtns={null}
                columnHeadings={['S - M', 'L - XL']}
                rowsData={[
                    ['Length', '18 cm', '21.5 cm'],
                    ['Width', '7.5 cm', '8.5 cm'],
                    ['Thumbfinger Length', '5.5 cm', '6.5 cm'],
                    ['Thumbfinger Width', '2.5 cm', '3 cm'],
                    ['Cuff Total Length', '4.5 cm', '5 cm'],
                    ['Cuff Width Rlaxed', '7 cm', '7.5 cm']
                ]} />
            <SizeTableAccordian title='Knitted Scarfs' headingTracking_null tableHeading='Circumference' indexColWidth='w-36 sm:w-[37%]' restColsWidth='w-36  sm:w-[16%]' unitBtns={null}
                columnHeadings={['S', 'M', 'L', 'XL']}
                rowsData={[
                    ['1 CM extra for not adjustable caps', '50 cm', '52 cm', '54 cm', '56 cm'],
                    ['Heigth', '14 cm', '15 cm', '16 cm', '17 cm']
                ]} />
            <HelpSection />
        </CutomerServices>
    )
}
