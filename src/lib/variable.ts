import { RiAccountPinBoxFill, RiCalendar2Fill, RiCopperCoinFill, RiCoupon2Fill, RiDashboardFill, RiFileList2Fill, RiImage2Fill, RiMap2Fill, RiQuestionnaireFill, RiSettings3Fill, RiShoppingBagFill, RiSquareFill, RiUser3Fill } from 'react-icons/ri'

// export const baseUrl:string = "https://backend.be-style.id/api";
export const baseUrl:string = "https://shisei-be.mahirtechno.my.id/api";

export const appUrl:string  = "https://be-style.id/"

export const menus = [
  {
    "title": "Dashboard",
    "name" : "dashboard",
    "path": "/back-office/dashboard",
    "icon": RiDashboardFill,
  },
  {
    "title": "Locations",
    "name" : "location",
    "path": "/back-office/location",
    "icon": RiMap2Fill
  },
  {
    "title": "Schedule",
    "name" : "schedule",
    "icon": RiCalendar2Fill,
    "group": ["schedule", "notes"],
    "children": [
      {
        "title": "Class",
        "name" : "schedule",
        "path": "/back-office/calendar/schedule",
      },
      // {
      //   "title": "User Notes",
      //   "name" : "notes",
      //   "path": "/back-office/calendar/note",
      // }
    ]
  },
  {
    "title": "Booking",
    "name" : "booking",
    "icon": RiFileList2Fill,
    "group": ["package", "validityperoid"],
    "children": [
      {
        "title": "Package",
        "name" : "package",
        "path": "/back-office/booking/package",
      },
      {
        "title": "Package Category",
        "name" : "package-category",
        "path": "/back-office/booking/package-category",
      },
      {
        "title": "Validity Period",
        "name" : "validityperoid",
        "path": "/back-office/booking/validity-period",
      },
      {
        "title": "Extend Day",
        "name" : "extend-day",
        "path": "/back-office/booking/extend-day",
      }
    ]
  },
  {
    "title": "Transaction",
    "name" : "transaction",
    "icon": RiShoppingBagFill,
    "group": ["transactionpackage", "transactionschedule", "historycredit"],
    "children": [
      {
        "title": "Package",
        "name" : "transactionpackage",
        "path": "/back-office/transaction/package",
      },
      {
        "title": "Schedule",
        "name" : "transactionschedule",
        "path": "/back-office/transaction/schedule",
      },
      {
        "title": "Credit",
        "name" : "historycredit",
        "path": "/back-office/transaction/credit",
      },
    ]
  },
  {
    "title": "Coupon",
    "name" : "coupon",
    "path": "/back-office/coupon",
    "icon": RiCoupon2Fill,
  },
  {
    "title": "Corporate",
    "name" : "corporate",
    "path": "/back-office/corporate",
    "icon": RiCopperCoinFill,
  },
  {
    "title": "Account",
    "name" : "user",
    "icon": RiAccountPinBoxFill,
    "group": ["admin", "staff", "user"],
    "children": [
      {
        "title": "Admin",
        "name" : "admin",
        "path": "/back-office/user/admin",
      },
      {
        "title": "Staff",
        "name" : "staff",
        "path": "/back-office/user/instructor",
      },
      {
        "title": "Customer",
        "name" : "user",
        "path": "/back-office/user/customer",
      },
    ]
  },
  {
    "title": "Setting",
    "name" : "setting",
    "icon": RiSettings3Fill,
    "group": ["role", "permission", "settingschedule", "contact", "templatemessage"],
    "children": [
      {
        "title": "Role",
        "name" : "role",
        "path": "/back-office/setting/role",
      },
      {
        "title": "Permission",
        "name" : "permission",
        "path": "/back-office/setting/permision",
      },
      {
        "title": "Schedule",
        "name" : "settingschedule",
        "path": "/back-office/setting/schedule",
      },
      {
        "title": "Contact",
        "name" : "contact",
        "path": "/back-office/setting/contact",
      },
      {
        "title": "Template Package",
        "name" : "templatemessage",
        "path": "/back-office/setting/message",
      },
      {
        "title": "Template Reminder",
        "name" : "templatereminder",
        "path": "/back-office/setting/reminder",
      },
    ]
  },
  {
    "title": "Studio",
    "name" : "studio",
    "path": "/back-office/studio",
    "icon": RiSquareFill
  },
  {
    "title": "Gallery",
    "name" : "gallery",
    "path": "/back-office/galery",
    "icon": RiImage2Fill
  },
  {
    "title": "Faq",
    "name" : "faq",
    "path": "/back-office/faq",
    "icon": RiQuestionnaireFill
  },
  {
    "title": "Profile",
    "name" : "profile",
    "path": "/back-office/profile",
    "icon": RiUser3Fill
  },

]

// bca, bni, bsi, bri, muamalat, mandiri, permata, bss, cimb, bjb
// qris, CREDIT_CARD
export const PaymentMethos = [
  {
    "name" : "CREDIT_CARD",
    "title": "CREDIT CARD",
    "icon": "/img/bank/visa.png"
  },
  {
    "name" : "QRIS",
    "title": "QRIS",
    "icon": "/img/bank/qris.png"
  },
  {
    "name" : "BCA",
    "title": "BCA",
    "icon": "/img/bank/bca.png"
  },
  {
    "name" : "BNI",
    "title": "BNI",
    "icon": "/img/bank/bni.png"
  },
  {
    "name" : "BSI",
    "title": "BSI",
    "icon": "/img/bank/bsi.png"
  },
  {
    "name" : "BRI",
    "title": "BRI",
    "icon": "/img/bank/bri.png"
  },
  {
    "name" : "MANDIRI",
    "title": "Mandiri",
    "icon": "/img/bank/mandiri.png"
  },
  {
    "name" : "PERMATA",
    "title": "Permata",
    "icon": "/img/bank/permata.png"
  },
  {
    "name" : "CIMB",
    "title": "CIMB",
    "icon": "/img/bank/cimp.png"
  },
  {
    "name" : "BJB",
    "title": "BJB",
    "icon": "/img/bank/bjb.png"
  },
]