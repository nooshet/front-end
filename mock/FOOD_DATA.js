export const FOOD_DATA = [
  {
    id: "1",
    title: "Klassik Burger Menyu",
    price: 12.5,
    rating: 4.8,
    // Şəkli internetdən götürürük (obyekt kimi)
    image: {
      uri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80",
    },
    description: "Təzə mal əti, çedar pendiri və xüsusi sous ilə.",
  },
  {
    id: "2",
    title: "Margarita Pizza",
    price: 15.0,
    rating: 4.5,
    image: {
      uri: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    description: "İtalyan xəmiri, mozzarella pendiri və pomidor sousu.",
  },
  {
    id: "3",
    title: "Sezar Salatı",
    price: 9.8,
    rating: 4.3,
    image: {
      uri: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    description: "Toyuq filesi, aysberq kahı və parmezan pendiri.",
  },
  {
    id: "4",
    title: "Suşi Seti (24 ədəd)",
    price: 35.0,
    rating: 4.9,
    image: {
      uri: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    description: "Filadelfiya, Kaliforniya və Maki rolları.",
  },
  {
    id: "5",
    title: "Qril Toyuq",
    price: 18.5,
    rating: 4.6,
    image: {
      uri: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    description: "Odun atəşində bişmiş bütöv toyuq.",
  },
];

export const VIDEO_DATA = [
  {
    id: "1",
    title: "Ev üsulu Burger hazırlanması",
    time: 12, // Dəqiqə
    rating: 4.9,
    chefName: "Əhməd bəyin mətbəxi",
    image: {
      uri: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&auto=format&fit=crop&w=765&q=80",
    },
    description: "Ən dadlı və şirəli burgeri evdə necə hazırlamaq olar?",
  },
  {
    id: "2",
    title: "İtalyan Pizza sirrləri",
    time: 15,
    rating: 4.7,
    chefName: "Gülşən xalanın mətbəxi",
    image: {
      uri: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1769&q=80",
    },
    description: "Xəmirin düzgün açılması və sousun hazırlanması.",
  },
  {
    id: "3",
    title: "Mükəmməl Steyk bişirmək",
    time: 8,
    rating: 4.8,
    chefName: "Kənan usta",
    image: {
      uri: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    },
    description: "Steykin qızardılma dərəcələri və marinad qaydası.",
  },
  {
    id: "4",
    title: "Şokoladlı Sufle resepti",
    time: 20,
    rating: 5.0,
    chefName: "Leyla xanım",
    image: {
      uri: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    },
    description: "İçi axışqan şokoladlı desertin hazırlanması.",
  },
  {
    id: "5",
    title: "Sağlam Səhər Yeməyi",
    time: 10,
    rating: 4.6,
    chefName: "Sənan usta",
    image: {
      uri: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    },
    description: "Avokado tost və qayğanaq.",
  },
];

export const CATEGORY_DATA = [
  {
    id: "1",
    title: "Gündəlik yeməklər",
    count: "32 növ",
    image: {
      uri: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Qızardılmış toyuq/ət
    },
  },
  {
    id: "2",
    title: "Dietik yeməklər",
    count: "41 növ",
    image: {
      uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Tərəvəzli kotlet/salat
    },
  },
  {
    id: "3",
    title: "Uşaq yeməkləri",
    count: "14 növ",
    image: {
      uri: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Sıyıq/Kaşa
    },
  },
  {
    id: "4",
    title: "Salatlar və qəlyanaltılar",
    count: "22 növ",
    image: {
      uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Salat
    },
  },
  {
    id: "5",
    title: "İçkilər",
    count: "18 növ",
    image: {
      uri: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "6",
    title: "Şirniyyatlar",
    count: "56 növ",
    image: {
      uri: "https://images.unsplash.com/photo-1563729768-6afa67e60539?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  },
];
