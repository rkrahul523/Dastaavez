export const GRADES = [
    {
        grade: 'A+',
        point: 10
    },
    {
        grade: 'A',
        point: 9
    },
    {
        grade: 'B+',
        point: 8
    },
    {
        grade: 'B',
        point: 7
    },
    {
        grade: 'C+',
        point: 6
    },
    {
        grade: 'C',
        point: 5
    },
    {
        grade: 'F',
        point: 0
    },
]

const ME=[
    { subcode: 'ME401', credit: 3 },
     { subcode: 'ME402', credit: 3 },
     { subcode: 'ME403', credit: 3 },
     { subcode: 'ME404', credit: 3 },
     { subcode: 'EC404', credit: 3 },
     { subcode: 'IT402', credit: 0 },
     { subcode: 'ME401P', credit: 1 },
     { subcode: 'ME403P', credit: 1 },
    { subcode: 'PE401P', credit: 1 },
    { subcode: 'EX401', credit: 1 },
    { subcode: 'IN401', credit: 2 },
    
    ]


    const MME=[
        { subcode: 'MT2201', credit: 2 },
         { subcode: 'MT2202', credit: 3 },
         { subcode: 'MT2203', credit: 3 },
         { subcode: 'MT2204', credit: 3 },
         { subcode: 'MT2205', credit: 3 },
         { subcode: 'MT2206', credit: 4 },
         { subcode: 'MT2211', credit: 1 },
         { subcode: 'MTD2212', credit: 1 },
        { subcode: 'EA2221', credit: 1 }
        
        ]


        const MME3rd=[
            { subcode: 'MA2101', credit: 3 ,name:'MATHEMATICS-III', type:'THEORY'},
             { subcode: 'MT2101', credit: 3 ,name:'FLUID MECHANICS', type:'THEORY'},
             { subcode: 'MT2102', credit:2 ,name:'MINERAL DRESSING', type:'THEORY'},
             { subcode: 'MT2103', credit:2 ,name:'FUELS, FURNACES AND REFRACTORIES', type:'THEORY'},
             { subcode: 'MT2104', credit: 4 ,name:'METALLURGICAL THERMODYMICS AND KINETICS', type:'THEORY' },
             { subcode: 'MT2105', credit: 3 ,name:'PRINCIPLES OF EXTRACTIVE METALLURGY', type:'THEORY' },
            { subcode: 'MT2111', credit: 1 ,name:'FLUID MECHANICS LABORATORY', type:'PRACTICAL'},
            { subcode: 'MT2112', credit: 1 ,name:'MINERAL DRESSING LABORATORY', type:'PRACTICAL'},
            { subcode: 'MT2113', credit: 1 ,name:'FUELS, FURNACES AND REFRACTORIES LABORATORY', type:'PRACTICAL'},
            { subcode: 'EA2121', credit: 1 ,name:'EXTRA ACTIVITIES (NSO/NSS/NCC/YOGA/CREATIVE ARTS/MINI PROJECT', type:'PRACTICAL'}
            
            ]

            const ME3rd=[
                { subcode: 'ME301', credit: 3 ,name:'THERMODYNAMICS', type:'THEORY'},
                { subcode: 'ME302', credit: 3  ,name:'FLUID MECHANICS', type:'THEORY'},
                { subcode: 'ME303', credit: 3 ,name:'STRENGTH OF MATERIALS', type:'THEORY'},
                 { subcode: 'MT301', credit: 3 ,name:'MATERIALS ENGINEERING', type:'THEORY'},
                 { subcode: 'BSC301', credit: 4 ,name:'MATHEMATICS-III', type:'THEORY'},
                { subcode: 'BSC302', credit: 0 ,name:'ENVIRONMENTAL SCIENCE', type:'THEORY'},
                { subcode: 'ME301P', credit: 1 ,name:'THERMODYNAMICS LAB', type:'PRACTICAL'},
                { subcode: 'ME302P', credit: 1 ,name:'FLUID MECHANICS LAB', type:'PRACTICAL'},
                { subcode: 'ME303P', credit: 1 ,name:'STRENGTH OF MATERIALS LAB', type:'PRACTICAL'},
                { subcode: 'EX301', credit: 1 ,name:'EXTRA ACTIVITIES (NSO/NSS/NCC/YOGA/CREATIVE ARTS/MINI PROJECT', type:'PRACTICAL'},
                { subcode: 'HS301', credit: 1 ,name:'COMMUNICATION SKILL LAB', type:'PRACTICAL'}
                
                ]

                const ME2nd=[
                    { subcode: 'BSC105', credit: 4 },
                    { subcode: 'BSC102', credit: 4 },
                    { subcode: 'BSC104', credit: 4 },
                    { subcode: 'ESC103', credit: 4 },
                    { subcode: 'HSMC101', credit: 3 },
                    { subcode: 'ESC104', credit: 3 },
                    { subcode: 'BSC102P', credit: 1 },
                    { subcode: 'ESC103P', credit: 1 },
                    
                    ]
                const BE1st=[
                    { subcode: 'BSC101', credit: 4 },
                    { subcode: 'BSC103', credit: 4 },
                    { subcode: 'ESC101', credit: 4 },
                    { subcode: 'ESC102', credit: 3 },
                    { subcode: 'BSC101P', credit: 1.5 },
                    { subcode: 'ESC101P', credit: 1 },
                    
                    ]

export const subjectCodes=[ 
    {text:'B.Tech 1st SEM MME (2021-2025)', code: 1, sub: BE1st},
    {text:'B.Tech 1st SEM ME (2021-2025)', code: 2, sub: BE1st},
    {text:'B.Tech 2nd SEM MME (2021-2025)', code: 3, sub: ME2nd},
    {text:'B.Tech 2nd SEM ME (2021-2025)', code: 4, sub: ME2nd},
    {text:'B.Tech 3rd SEM MME (2021-2025)', code: 5, sub: MME3rd},
    {text:'B.Tech 3rd SEM ME (2021-2025)', code: 6, sub: ME3rd},
    {text:'B.Tech 3rd SEM ME (2021-2025)', code: 7, sub: ME3rd},
    {text:'B.Tech 3rd SEM ME (2021-2025)', code: 8, sub: ME3rd},
    {text:'B.Tech 4th SEM MME (2021-2025)', code: 9, sub: MME},
    {text:'B.Tech 4th SEM ME (2021-2025)', code: 10, sub: ME},
]


export const SUBJECTS = ME;




