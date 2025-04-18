import { ReactElement } from "react";
import {
    mirjamschmid,
    kevinmurphyproduct,
    kevinmurphyproduct2,
    hairproducts1,
    hairproducts2,
    hairproducts3,
    hairproducts4,
    hairstyle1,
    hairstyle2,
    hairstyle3,
    haircolour1,
    haircolour2,
    haircolour3,
    selfcareproducts,
    salon1,
    salon2,
    salon3,
    hannahgeier,
    ninahelm,
    simonehomann,
} from "../assets"
import {
    AllServicesInfoType,
    EmployeeType,
    EmployeesInfoType,
    OfferedServiceType,
    WeeklyStartEndTimesType,
} from "../utils/types";

export const weekdaysAbr = [
    "So.",
    "Mo.",
    "Di.",
    "Mi.",
    "Do.",
    "Fr.",
    "Sa.",
] as const;

export const weekdays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
] as const;

export const weekdaysEnglish = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
] as const;

export const openingTimes: WeeklyStartEndTimesType = {
    sunday: {
        start: null,
        end: null,
    },
    monday: {
        start: null,
        end: null,
    },
    tuesday: {
        start: "08:30",
        end: "18:00",
    },
    wednesday: {
        start: "08:30",
        end: "18:00",
    },
    thursday: {
        start: "08:30",
        end: "18:00",
    },
    friday: {
        start: "08:30",
        end: "18:00",
    },
    saturday: {
        start: "08:00",
        end: "13:00",
    },
};

export const availableServices = [
    "Schneiden",
    "KindU6",
    "KindU12",
    "TeenU14",
    "Cornrows",
    "Rasur",
    "Greyblending",
    "Dauerwelle",
    "Coloration",
] as const;

export const availableEmployees = [
    "66401720b8fb65815722ab38",
    "6642f2eb23c54c42bf7d7f30",
    "66403f93eef48844b222489c",
    "6642f2ca23c54c42bf7d7f2d",
] as const;

export const employeesInfo: EmployeesInfoType = {
    "66401720b8fb65815722ab38": {
        firstname: "Mirjam",
        lastname: "Schmid",
        skills: ["Schneiden", "KindU12", "TeenU14", "Greyblending", "Dauerwelle", "Coloration"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "08:30", "end": "18:00" },
            "wednesday": { "start": "08:30", "end": "18:00" },
            "thursday": { "start": "08:30", "end": "18:00" },
            "friday": { "start": "08:30", "end": "18:00" },
            "saturday": { "start": "08:00", "end": "13:00" },
            "sunday": { "start": null, "end": null }
        },
    },
    "6642f2eb23c54c42bf7d7f30": {
        firstname: "Nina",
        lastname: "Helm",
        skills: ["Schneiden", "KindU6", "KindU12", "TeenU14", "Cornrows", "Rasur"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "08:30", "end": "15:00" },
            "wednesday": { "start": "08:30", "end": "15:00" },
            "thursday": { "start": "08:30", "end": "15:00" },
            "friday": { "start": "08:30", "end": "15:00" },
            "saturday": { "start": "08:00", "end": "13:00" },
            "sunday": { "start": null, "end": null }
        },
    },
    "66403f93eef48844b222489c": {
        firstname: "Hannah",
        lastname: "Geier",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur", "Greyblending", "Dauerwelle", "Coloration"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "08:30", "end": "18:00" },
            "wednesday": { "start": "08:30", "end": "18:00" },
            "thursday": { "start": "08:30", "end": "18:00" },
            "friday": { "start": "08:30", "end": "18:00" },
            "saturday": { "start": null, "end": null },
            "sunday": { "start": null, "end": null }
        },
    },
    "6642f2ca23c54c42bf7d7f2d": {
        firstname: "Simone",
        lastname: "Homann",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur"],
        working_hours: {
            "monday": { "start": null, "end": null },
            "tuesday": { "start": "10:00", "end": "18:00" },
            "wednesday": { "start": "10:00", "end": "18:00" },
            "thursday": { "start": "10:00", "end": "18:00" },
            "friday": { "start": "10:00", "end": "18:00" },
            "saturday": { "start": "08:00", "end": "13:00" },
            "sunday": { "start": null, "end": null }
        },
    }
};

export const employees: EmployeeType[] = [
    {
        id: "66401720b8fb65815722ab38",
        firstname: "Mirjam",
        lastname: "Schmid",
        skills: ["Schneiden", "KindU12", "TeenU14", "Greyblending", "Dauerwelle", "Coloration"],
        img: mirjamschmid,
        imglink: "https://unsplash.com/de/fotos/frau-in-weiss-blau-kariertem-hemd-jzz_3jWMzHA",
        imgtitle: "Foto von Rivage auf Unsplash",
        description: [
            "KEVIN.MURPHY Spezialistin",
            "Blow Dry",
            "Der perfekte Haarschnitt",
            "Klassisches und modisches Styling",
            "Tipps für zuhause",
        ],
        quote: "Als Ladeninhaberin sorge ich für eine angenehme Atmosphäre und die permanente, trendorientierte Weiterbildung meines Teams.",
    },
    {
        id: "6642f2eb23c54c42bf7d7f30",
        firstname: "Nina",
        lastname: "Helm",
        skills: ["Schneiden", "KindU6", "KindU12", "TeenU14", "Cornrows", "Rasur"],
        img: ninahelm,
        imglink: "https://unsplash.com/de/fotos/frau-im-weissen-rundhalshemd-lachelnd-IF9TK5Uy-KI",
        imgtitle: "Foto von Jake Nackos auf Unsplash",
        description: [
            "Educator/ Key für KEVIN.MURPHY COLOR.ME und SHOWPONY",
            "Balayage Spezialistin",
            "Haarverlängerung und Haarverdichtung",
            "Herrenhaarschnitte",
            "Brautstyling",
        ],
        quote: "Mein Beruf ist meine Berufung. Bei mir ist man keine schnelle Nummer.",
    },
    {
        id: "66403f93eef48844b222489c",
        firstname: "Hannah",
        lastname: "Geier",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur", "Greyblending", "Dauerwelle", "Coloration"],
        img: hannahgeier,
        imglink: "https://www.freepik.com/free-photo/portrait-beautiful-young-woman-glasses-wearing-eyewear-smiling-looking-happy-trying-new_146536451.htm",
        imgtitle: "Image by freepik",
        description: [
            "Farb und Strähnen Spezialistin",
            "Schnitte aller Art",
            "Naturlocken",
            "Flechtfrisuren und Braids",
        ],
        quote: "Mein Beruf ist meine große Leidenschaft und ich liebe es wenn meine Kunden mit einen Lächeln gehen.",
    },
    {
        id: "6642f2ca23c54c42bf7d7f2d",
        firstname: "Simone",
        lastname: "Homann",
        skills: ["Schneiden", "TeenU14", "Cornrows", "Rasur"],
        img: simonehomann,
        imglink: "https://unsplash.com/de/fotos/frau-tragt-schwarzes-langarmeliges-hemd-mit-rundhalsausschnitt-Zz5LQe-VSMY",
        imgtitle: "Foto von Stephanie Liverani auf Unsplash",
        description: [
            "Klassische Frisuren",
            "Traditionelle Wasser- und Dauerwelle",
            "Hochsteckfrisuren, und alles was Ihr Herz begehrt",
        ],
        quote: "Ich bin immer auf Zack und freue mich auf neue Erfahrungen.",
    },
];

export const proposalDateRangeValues = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
] as const;

type ImageSliderObjectType = {
    id: number,
    src: string,
    alt: string,
    href?: string,
    title?: string,
};

const kevinmurphyproduct1Obj: Omit<ImageSliderObjectType, "id"> = {
    src: kevinmurphyproduct,
    alt: "Kevin Murphy Produkte 1",
    href: "https://unsplash.com/de/fotos/zwei-weisse-und-schwarz-etikettierte-flaschen-EekAcoEhYGU",
    title: "Foto von Nick Scott auf Unsplash",
};

const kevinmurphyproduct2Obj: Omit<ImageSliderObjectType, "id"> = {
    src: kevinmurphyproduct2,
    alt: "Kevin Murphy Produkte 2",
    href: "https://unsplash.com/de/fotos/weisse-und-rosa-etikettierte-flaschen-Yo6tVaQHAho",
    title: "Foto von Nick Scott auf Unsplash",
};

const hairproducts1Obj: Omit<ImageSliderObjectType, "id"> = {
    src: hairproducts1,
    alt: "Frontrow Produkte",
    href: "https://unsplash.com/de/fotos/zwei-verschiedene-arten-von-haarprodukten-auf-rosa-hintergrund-mGEVuLZNAxY",
    title: "Foto von Amy Lewis auf Unsplash",
};

const hairproducts2Obj: Omit<ImageSliderObjectType, "id"> = {
    src: hairproducts2,
    alt: "Act+ Acre Produkte",
    href: "https://unsplash.com/de/fotos/weisser-und-grun-beschrifteter-weicher-schlauch-aYrOtqypmho",
    title: "Foto von Glenna Haug auf Unsplash",
};

const hairstyle1Obj: Omit<ImageSliderObjectType, "id"> = {
    src: hairstyle1,
    alt: "Frau mit Locken",
    href: "https://www.freepik.com/free-photo/beautiful-woman-with-curls-makeup_6048346.htm",
    title: "Image by Racool_studio on Freepik",
};

const hairstyle2Obj: Omit<ImageSliderObjectType, "id"> = {
    src: hairstyle2,
    alt: "Hochzeitfrisur von hinten",
    href: "https://www.freepik.com/free-photo/beauty-wedding-hairstyle-rear-view-isolated-white_10230952.htm",
    title: "Image by valuavitaly on Freepik",
};

const hairstyle3Obj: Omit<ImageSliderObjectType, "id"> = {
    src: hairstyle3,
    alt: "Frau mit langen glatten Haaren",
    href: "https://www.freepik.com/free-photo/portrait-beautiful-sexy-woman-with-long-hair-fashion-model-with-straight-hairstyle_11961892.htm",
    title: "Image by valuavitaly on Freepik",
};

const hairproducts3Obj: Omit<ImageSliderObjectType, "id"> = {
    src: hairproducts3,
    alt: "Haarprodukte3",
    href: "https://www.freepik.com/free-photo/small-plant-near-various-cosmetics-bottles_2146565.htm",
    title: "Image by freepik",
};

const hairproducts4Obj: Omit<ImageSliderObjectType, "id"> = {
    src: hairproducts4,
    alt: "Haarprodukte4",
    href: "https://www.freepik.com/free-ai-image/3d-rendering-personal-care-products-fondant-pink_94940306.htm",
    title: "Image by freepik",
};

const selfcareproductsObj: Omit<ImageSliderObjectType, "id"> = {
    src: selfcareproducts,
    alt: "Haarstyling Zubehör",
    href: "https://www.freepik.com/free-photo/close-up-man-selfcare-products_23668485.htm",
    title: "Image by freepik",
};

const haircolour1Obj: Omit<ImageSliderObjectType, "id"> = {
    src: haircolour1,
    alt: "Frau mit lila Haarfarbe",
    href: "https://unsplash.com/de/fotos/purple-haired-woman-in-black-top-leaning-on-wall-tLKOj6cNwe0",
    title: "Foto von Kareya Saleh auf Unsplash",
};

const haircolour2Obj: Omit<ImageSliderObjectType, "id"> = {
    src: haircolour2,
    alt: "Frau mit gefärbten Haaren",
    href: "https://unsplash.com/de/fotos/frau-in-schwarzer-jacke-mit-kragen-pZTVa_Gt1f8",
    title: "Foto von Thibault Debaene auf Unsplash",
};

const haircolour3Obj: Omit<ImageSliderObjectType, "id"> = {
    src: haircolour3,
    alt: "Frau bekommt Haare gefärbt",
    href: "https://unsplash.com/de/fotos/braunes-haar-mit-weissem-band-B1B-53ZBgng",
    title: "Foto von Lera Kogan auf Unsplash",
};

const salon1Obj: Omit<ImageSliderObjectType, "id"> = {
    src: salon1,
    alt: "Hair Salon Frauenbereich",
    href: "https://unsplash.com/de/fotos/foto-der-innenansicht-des-salons-PtOfbGkU3uI",
    title: "Foto von Guilherme Petri auf Unsplash",
};

const salon2Obj: Omit<ImageSliderObjectType, "id"> = {
    src: salon2,
    alt: "Hair Salon Männerbereich",
    href: "https://unsplash.com/de/fotos/ein-raum-gefullt-mit-mobeln-und-blumenvase-auf-einem-tisch-dDhWJLXEZ5I",
    title: "Foto von Benyamin Bohlouli auf Unsplash",
};

const salon3Obj: Omit<ImageSliderObjectType, "id"> = {
    src: salon3,
    alt: "Hair Salon Männerbereich 2",
    href: "https://unsplash.com/de/fotos/ein-raum-mit-mobeln-und-einem-grossen-fenster-_C-S7LqxHPw",
    title: "Foto von Benyamin Bohlouli auf Unsplash",
};

export const bookingpageSliderImgs: ImageSliderObjectType[] = [
    {
        id: 0,
        ...kevinmurphyproduct1Obj,
    },
    {
        id: 1,
        ...kevinmurphyproduct2Obj,
    },
    {
        id: 2,
        ...hairproducts1Obj,
    },
    {
        id: 3,
        ...hairproducts2Obj,
    },
];

export const stylingpageSliderImgs: ImageSliderObjectType[] = [
    {
        id: 0,
        ...hairstyle1Obj,
    },
    {
        id: 1,
        ...hairstyle2Obj,
    },
    {
        id: 3,
        ...hairstyle3Obj,
    },
];

export const stylingpageSliderImgs2: ImageSliderObjectType[] = [
    {
        id: 0,
        ...hairproducts3Obj,
    },
    {
        id: 1,
        ...hairproducts4Obj,
    },
    {
        id: 3,
        ...selfcareproductsObj,
    },
];

export const colourpageSliderImgs: ImageSliderObjectType[] = [
    {
        id: 0,
        ...kevinmurphyproduct1Obj,
    },
    {
        id: 1,
        ...hairproducts3Obj,
    },
    {
        id: 3,
        ...kevinmurphyproduct2Obj,
    },
];

export const colourpageSliderImgs2: ImageSliderObjectType[] = [
    {
        id: 0,
        ...haircolour1Obj,
    },
    {
        id: 1,
        ...haircolour2Obj,
    },
    {
        id: 2,
        ...haircolour3Obj,
    },
];

export const colourpageSliderImgs3: ImageSliderObjectType[] = [
    {
        id: 0,
        ...hairproducts4Obj,
    },
    {
        id: 1,
        ...selfcareproductsObj,
    },
    {
        id: 2,
        ...hairproducts1Obj,
    },
];

export const salonpageSliderImgs1: ImageSliderObjectType[] = [
    {
        id: 0,
        ...salon1Obj,
    },
    {
        id: 1,
        ...salon2Obj,
    },
    {
        id: 2,
        ...salon3Obj,
    },
];

export const salonpageSliderImgs2: ImageSliderObjectType[] = [
    {
        id: 0,
        ...kevinmurphyproduct1Obj,
    },
    {
        id: 1,
        ...hairproducts2Obj,
    },
    {
        id: 2,
        ...salon3Obj,
    },
    {
        id: 3,
        ...kevinmurphyproduct2Obj,
    },
    {
        id: 4,
        ...haircolour2Obj,
    },
    {
        id: 5,
        ...salon2Obj,
    },
    {
        id: 6,
        ...hairproducts3Obj,
    },
    {
        id: 7,
        ...selfcareproductsObj,
    },
];

export const jobspageSliderImgs1: ImageSliderObjectType[] = [
    {
        id: 0,
        ...selfcareproductsObj,
    },
    {
        id: 1,
        ...hairproducts4Obj,
    },
    {
        id: 2,
        ...hairproducts2Obj,
    },
    {
        id: 3,
        ...salon1Obj,
    },
];


export const allServicesInfo: AllServicesInfoType = {
    Schneiden: {
        service_label: "Schneiden (ca. 30 min.)",
        service_duration: 30,
    },
    KindU6: {
        service_label: "Kinderschnitt bis 6 Jahre (ca. 30 min.)",
        service_duration: 30,
    },
    KindU12: {
        service_label: "Kinderschnitt von 7 bis 12 Jahre (ca. 30 min.)",
        service_duration: 30,
    },
    TeenU14: {
        service_label: "Teenagerschnitt von 12 bis 14 Jahre (ca. 30 min.)",
        service_duration: 30,
    },
    Cornrows: {
        service_label: "Cornrows (ca. 60 min.)",
        service_duration: 60,
    },
    Rasur: {
        service_label: "Rasur (ca. 30 min.)",
        service_duration: 30,
    },
    Greyblending: {
        service_label: "Greyblending (ca. 30 min.)",
        service_duration: 30,
    },
    Dauerwelle: {
        service_label: "Dauerwelle (ca. 45 min.)",
        service_duration: 45,
    },
    Coloration: {
        service_label: "Coloration (ca. 30 min.)",
        service_duration: 30,
    }
}

export const offeredCuttingServices: OfferedServiceType[] = [
    {
        service_id: 0,
        service_name: "Schneiden",
        service_label: "Schneiden (ca. 30 min.)",
        service_duration: 30,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
    },
    {
        service_id: 1,
        service_name: "KindU6",
        service_label: "Kinderschnitt bis 6 Jahre (ca. 30 min.)",
        service_duration: 30,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
    },
    {
        service_id: 2,
        service_name: "KindU12",
        service_label: "Kinderschnitt von 7 bis 12 Jahre (ca. 30 min.)",
        service_duration: 30,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
    },
    {
        service_id: 3,
        service_name: "TeenU14",
        service_label: "Teenagerschnitt von 12 bis 14 Jahre (ca. 30 min.)",
        service_duration: 30,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
    },
    {
        service_id: 4,
        service_name: "Cornrows",
        service_label: "Cornrows (ca. 60 min.)",
        service_duration: 60,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
    },
];

const RasurInfo = (): ReactElement => (
    <>
        <div className="dialog__caption ">
            Rasur
        </div>
        <div className="dialog__content">
            <span className="description">
                Nassrasur / Konturen
            </span>
            <span className="duration">
                Dauer ca. 30 min.
            </span>
        </div>
        <div className="dialog_button_container"></div>
    </>
);

const GrayBlendingInfo = (): ReactElement => (
    <>
        <div className="dialog__caption ">
            Grayblending
        </div>
        <div className="dialog__content">
            <span className="description">
                Natürliche Grauabdeckung
            </span>
            <span className="duration">
                Dauer ca. 30 min.
            </span>
        </div>
    </>
)

export const offeredShavingServices: OfferedServiceType[] = [
    {
        service_id: 5,
        service_name: "Rasur",
        service_label: "Rasur (ca. 30 min.)",
        service_duration: 30,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
        service_info: <RasurInfo />,
    },
];

export const offeredColorationServices: OfferedServiceType[] = [
    {
        service_id: 6,
        service_name: "Greyblending",
        service_label: "Greyblending (ca. 30 min.)",
        service_duration: 30,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
        service_info: <GrayBlendingInfo />,
    },
    {
        service_id: 7,
        service_name: "Dauerwelle",
        service_label: "Dauerwelle (ca. 45 min.)",
        service_duration: 45,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
    },
    {
        service_id: 8,
        service_name: "Coloration",
        service_label: "Coloration (ca. 30 min.)",
        service_duration: 30,
        employees: ["Mirjam Schmid", "Nina Helm", "Hannah Geier"],
    },
];