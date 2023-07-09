export const priorities = {
    salary: { name: 'Löhne', color: 'bg-urgent' },
    high: { name: 'Hoch', color: 'bg-high' },
    medium: { name: 'Mittel', color: 'bg-medium' },
    low: { name: 'Niedrig', color: 'bg-low' },
}
export const status = {
    open: { name: 'Unbearbeitet', color: 'bg-urgent' },
    inProgress: { name: 'In Bearbeitung', color: 'bg-medium' },
    completed: { name: 'Abgeschlossen', color: 'bg-low' }
}

export const statusSelections = [
    { name: 'Unbearbeitet', color: 'bg-urgent', status: 'open' },
    { name: 'In Bearbeitung', color: 'bg-medium', status: 'inProgress' },
    { name: 'Abgeschlossen', color: 'bg-low', status: 'completed' },
    { name: 'Jahresdeklaration', color: 'bg-medium', status: 'Annual Declaration' },
    { name: 'zur Kontrolle', color: 'bg-medium', status: 'For Control' },
    { name: 'MWST', color: 'bg-medium', status: 'VAT' },
    { name: 'Januar', color: 'bg-medium', status: 'January' },
    { name: 'Februar', color: 'bg-medium', status: 'February' },
    { name: 'März', color: 'bg-medium', status: 'March' },
    { name: 'April', color: 'bg-medium', status: 'April' },
    { name: 'Mai', color: 'bg-medium', status: 'May' },
    { name: 'Juni', color: 'bg-medium', status: 'June' },
    { name: 'Juli', color: 'bg-medium', status: 'July' },
    { name: 'August', color: 'bg-medium', status: 'August' },
    { name: 'September', color: 'bg-medium', status: 'September' },
    { name: 'Oktober', color: 'bg-medium', status: 'October' },
    { name: 'November', color: 'bg-medium', status: 'November' },
    { name: 'Dezember', color: 'bg-medium', status: 'December' }
  ]
export const months = {
    jan: 'Januar',
    feb: 'Februar',
    mar: 'März',
    apr: 'April',
    may: 'Mai',
    jun: 'Juni',
    jul: 'Juli',
    aug: 'August',
    sep: 'September',
    oct: 'Oktober',
    nov: 'November',
    dec: 'Dezember'
};