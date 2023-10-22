import dayjs from 'dayjs'
import 'dayjs/locale/en-gb'

import advancedFormat from 'dayjs/plugin/advancedFormat'
import calendar from 'dayjs/plugin/calendar'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import minMax from 'dayjs/plugin/minMax'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isToday from 'dayjs/plugin/isToday'

dayjs.extend(relativeTime)
dayjs.extend(calendar)
dayjs.extend(localizedFormat)
dayjs.extend(minMax)
dayjs.extend(advancedFormat)
dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.extend(weekOfYear)
dayjs.extend(timezone)
dayjs.extend(updateLocale)
dayjs.extend(isToday)

dayjs.locale('en-gb')
