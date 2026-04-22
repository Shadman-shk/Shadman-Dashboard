import { CheckCircle, Eye, ListCheck } from "lucide-react"

export const STATUS_ORDER=[
    "under_review",
    "planned",
    "in_progress",
    "completed"
]

export const STATUS_GROUPS = {
    under_review:{
        title: "Under review",
        description: "New suggestions being evaluated",
        icon: Eye,
        color: "border-gray-400 dark:border-500",
        bgColor:
           "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50",
        textColor: "text-gray-700 dark:text-gray-300",
        countColor: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark: text-gray-300",
    },
    planned:{
         title: "Planned",
        description: "Features we are working on",
        icon: ListCheck,
        color: "border-blue-500",
        bgColor:
           "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indogo-800/50",
        textColor: "text-blue-700 dark:text-blue-300",
        countColor: "bg-blue-100 dark:bg-blue-800 text-blue-700 dark: text-blue-300"
    },
    completed:{
         title: "Completed",
        description: "Recently Shipped Features",
        icon: CheckCircle,
        color: "border-green-500",
        bgColor:
           "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/50",
        textColor: "text-green-700 dark:text-green-300",
        countColor: "bg-green-100 dark:bg-green-900 text-green-700 dark: text-green-300"
    }
}