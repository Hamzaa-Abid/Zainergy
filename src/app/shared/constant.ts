export enum enFilter {
    hour = 'hour',
    yearly = 'yearly',
    year = 'year',
    week = 'week',
    today = 'today',
    last24hours = 'last 24 hours',
    last30min = 'last 30 mins',
    last15min = 'last 15 mins',
    last30days = 'last 30 days',
    last90days = 'last 90 days',
    monthly = 'monthly',
    selectFilter = 'Select Filter',
    last20mins=  'last 20 mins'
}

export enum enPdf {
    print = 'Print',
    Pdf = 'Pdf'
}

export enum route {
    stat = "https://zainergy.qavitechnologies.com/directus/public/zainergy/custom/directory/zainergy?action=getLatestStatsByDevice"
}

export enum exceptForLoader {
    kpi = 'getLatestStatsByDevice'
}

export enum endeviceType {
    voltage = 'Meter',
    temp_hum = 'Sensor'
}


