const countryCodes = [
    { name: "Afghanistan", code: "+93", country: "af", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AF.jpg" },
    { name: "Armenia", code: "+374", country: "am", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AM.jpg" },
    { name: "Azerbaijan", code: "+994", country: "az", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AZ.jpg" },
    { name: "United Arab Emirates", code: "+971", country: "ae", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AE.jpg" },
    { name: "Australia", code: "+61", country: "au", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AU.jpg" },
    { name: "Canada", code: "+1", country: "ca", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/CA.jpg" },
    { name: "India", code: "+91", country: "in", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/IN.jpg" },
    { name: "Pakistan", code: "+92", country: "pk", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/PK.jpg" },
    { name: "Saudia Arabia", code: "+966", country: "sa", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/SA.jpg" },
    { name: "United Kingdom", code: "+44", country: "gb", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/GB.jpg" },
    { name: "United States America", code: "+1", country: "us", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/US.jpg" },
    { name: "Bahrain", code: "+973", country: "bh", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/BH.jpg" },
    { name: "Bangladesh", code: "+880", country: "bd", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/BD.jpg" },
    { name: "Bhutan", code: "+975", country: "bt", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/BT.jpg" },
    { name: "Brunei", code: "+673", country: "bn", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/BN.jpg" },
    { name: "Cambodia", code: "+855", country: "kh", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/KH.jpg" },
    { name: "China", code: "+86", country: "cn", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/CN.jpg" },
    { name: "Cyprus", code: "+357", country: "cy", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/CY.jpg" },
    { name: "Georgia", code: "+995", country: "ge", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/GE.jpg" },
    { name: "Indonesia", code: "+62", country: "id", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/ID.jpg" },
    { name: "Iran", code: "+98", country: "ir", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/IR.jpg" },
    { name: "Iraq", code: "+964", country: "iq", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/IQ.jpg" },
    { name: "Japan", code: "+81", country: "jp", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/JP.jpg" },
    { name: "Jordan", code: "+962", country: "jo", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/JO.jpg" },
    { name: "Kazakhstan", code: "+7", country: "kz", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/KZ.jpg" },
    { name: "Kuwait", code: "+965", country: "kw", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/KW.jpg" },
    { name: "Kyrgyzstan", code: "+996", country: "kg", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/KG.jpg" },
    { name: "Laos", code: "+856", country: "la", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/LA.jpg" },
    { name: "Lebanon", code: "+961", country: "lb", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/LB.jpg" },
    { name: "Malaysia", code: "+60", country: "my", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/MY.jpg" },
    { name: "Maldives", code: "+960", country: "mv", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/MV.jpg" },
    { name: "Mongolia", code: "+976", country: "mn", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/MN.jpg" },
    { name: "Myanmar", code: "+95", country: "mm", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/MM.jpg" },
    { name: "Nepal", code: "+977", country: "np", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/NP.jpg" },
    { name: "North Korea", code: "+850", country: "kp", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/KP.jpg" },
    { name: "Oman", code: "+968", country: "om", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/OM.jpg" },
    { name: "Palestine", code: "+970", country: "ps", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/PS.jpg" },
    { name: "Philippines", code: "+63", country: "ph", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/PH.jpg" },
    { name: "Qatar", code: "+974", country: "qa", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/QA.jpg" },
    { name: "Russia", code: "+7", country: "ru", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/RU.jpg" },
    { name: "Singapore", code: "+65", country: "sg", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/SG.jpg" },
    { name: "South Korea", code: "+82", country: "kr", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/KR.jpg" },
    { name: "Sri Lanka", code: "+94", country: "lk", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/LK.jpg" },
    { name: "Syria", code: "+963", country: "sy", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/SY.jpg" },
    { name: "Taiwan", code: "+886", country: "tw", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/TW.jpg" },
    { name: "Tajikistan", code: "+992", country: "tj", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/TJ.jpg" },
    { name: "Thailand", code: "+66", country: "th", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/TH.jpg" },
    { name: "Timor-Leste", code: "+670", country: "tl", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/TL.jpg" },
    { name: "Turkey", code: "+90", country: "tr", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/TR.jpg" },
    { name: "Turkmenistan", code: "+993", country: "tm", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/TM.jpg" },
    { name: "Uzbekistan", code: "+998", country: "uz", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/UZ.jpg" },
    { name: "Vietnam", code: "+84", country: "vn", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/VN.jpg" },
    { name: "Yemen", code: "+967", country: "ye", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/YE.jpg" },
    { name: "Belize", code: "+501", country: "bz", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/BZ.jpg" },
    { name: "Costa Rica", code: "+506", country: "cr", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/CR.jpg" },
    { name: "Cuba", code: "+53", country: "cu", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/CU.jpg" },
    { name: "El Salvador", code: "+503", country: "sv", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/SV.jpg" },
    { name: "Guatemala", code: "+502", country: "gt", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/GT.jpg" },
    { name: "Honduras", code: "+504", country: "hn", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/HN.jpg" },
    { name: "Mexico", code: "+52", country: "mx", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/MX.jpg" },
    { name: "Nicaragua", code: "+505", country: "ni", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/NI.jpg" },
    { name: "Panama", code: "+507", country: "pa", src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/PA.jpg" }
]
export const Countries = [
    {
        code: '+971',
        country: 'ae',
        name: 'United Arab Emirates',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AE.jpg"
    },
    {
        code: '+61',
        country: 'au',
        name: 'Australia',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/AU.jpg"
    },
    {
        code: '+1',
        country: 'ca',
        name: 'Canada',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/CA.jpg"
    },
    {
        code: '+91',
        country: 'in',
        name: 'India',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/IN.jpg"
    },
    {
        code: '+92',
        country: 'pk',
        name: 'Pakistan',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/PK.jpg"
    },
    {
        code: '+966',
        country: 'sa',
        name: 'Saudia Arabia',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/SA.jpg"
    },
    {
        code: '+44',
        country: 'gb',
        name: 'United Kingdom',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/GB.jpg"
    },
    {
        code: '+1',
        country: 'us',
        name: 'United States America',
        src: "https://urban-fits.s3.eu-north-1.amazonaws.com/country-flags/US.jpg"
    }
]
export default countryCodes