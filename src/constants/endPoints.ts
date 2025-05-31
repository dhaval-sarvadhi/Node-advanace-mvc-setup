
export enum APP_VERSION {
    API_V1 = '/api/v1',
}

export enum END_POINT {
    BLANK = '/',
    WELCOME = '/',
    BLANK_MANIPULATION = '/:id',
    HEALTH = '/HEALTH',
    ENC = '/encrypt',
    DEC = '/decrypt',

    ADMIN = '/admin',
    ADD_ADMIN = '/addAdmin',
    GET_ADMIN_BY_ID = '/getAdmin/:id',
    GET_ALL_ADMINS = '/getAllAdmins',



    MAIN_USER = '/api/v1/user',
    MAIN_ADMIN = '/api/v1/admin',
    MAIN_BUSINESS = '/api/v1/business',
    MAIN_MASTER = '/api/v1/master',
    MAIN_ROLE = '/api/v1/roles',
    MAIN_INVENTORY = '/api/v1/inventory',
    MAIN_AUDIT = '/api/v1/audit',
    MAIN_HOMESETTING = '/api/v1/home-setting',
    MAIN_PROJECTSETTING = '/api/v1/project-setting',
    MAIN_MATCHPAIR = '/api/v1/matchpair-setting',
    MAIN_BUSINESS_ASSOCIATE = '/api/v1/business-associate',
    MAIN_CUSTOMER = '/api/v1/customer',
    MAIN_DIAMOND_TRACKING = '/api/v1/diamond-track-details',
    MAIN_HOME = '/api/v1/home',
    MAIN_MARKUP = '/api/v1/markup',
    MAIN_BULK_EMAIL = '/api/v1/bulk-email',
    MAIN_EXTERNAL_CLIENT = '/api/v1/external-clients',


    USER = '/user',
    SIGNUP = '/signup',
    CHECK_USERNAME = '/check-username',
    CHECK_EMAIL = '/check-email',
    SEND_OTP = '/send-otp',
    OTP_VERIFY = '/otp-verify',
    LOGIN = '/login',
    LOGOUT = '/logout',
    FORGOT_PASSWORD = '/forgot',
    VERIFY_OTP = '/verify-otp',
    RESET_PASSWORD = '/reset-password',
    CHANGE_PASSWORD = '/change-password',
    PROFILE = '/profile',
    CUSTOMERS = '/customers',
    GET_UNREGISTERED_BUSINESSES = '/unregistered-businesses',
    UPLOAD_PROFILE = '/upload-profile',

    GET_USER = '/list',
    GET_BUSINESS_TYPES = '/types',
    GET_DESIGNATION = '/designations',

    GET_COUNTRIES = '/countries',
    GET_COUNTRIES_CODE = '/countries-code',
    GET_STATES = '/states/:id',
    GET_CITIES = '/cities',
    GET_COUNTRIES_ID = '/countries/:id',

    MASTER = '/masters',
    MASTER_BY_ID = '/masters/:id',
    MASTER_SEQUENCE = '/sequence/:id',
    MASTER_STATUS = '/status/:id',

    USD_TO_INR = '/usd_inr',

    SUBMASTER = '/submaster',
    SUBMASTER_BY_ID = '/submaster/:id',
    SUBMASTER_SEQUENCE = '/sub-sequence',
    SUBMASTER_STATUS = '/submaster/status/:id',

    SUBMASTER_BUSINESS = '/business-types',
    SUBMASTER_DESIGNATION = '/designations',

    ROLE_PERMISSION = '/permission/:id',
    PERMISSION_UPDATE = '/permission-update/:id',
    ASSIGN_ROLE = '/assign-role',
    CREATE_ROLE = '/create-role',
    GET_ROLES = '/',

    COMPANY = '/company',
    GET_COMPANY = '/company/:id',

    MAPPING = '/mapping',
    GET_MAPPING = '/mapping/:id?',
    MAPPING_FIELD = '/fields',

    STOCK_LIST_COLUMN = '/stock-list/:id?',
    STOCK_FIELD = '/stock-fields',

    FEATURED_STONE = '/featured-stone/:id?',
    GET_FEATURED_STONE = '/get-featured-stone',

    CARAT_RANGE = '/carat-range/:id?',
    MAP_DIAMONDS = '/map-diamonds',
    GET_CARAT_RANGE = '/carat-range/:id?',
    CARAT_RANGE_SEQUENCE = '/carat-range-sequence/:id',


    AUDIT_LOGS = '/audit-logs',

    APP_VERSION = '/app-version',
    GET_APP_VERSION = '/app-version/:id?',

    POPUP = '/popup',
    GET_POPUP = '/popup/:id',

    EVENT = '/event',
    GET_EVENT = '/event/:id',

    BANNER = '/banner',
    GET_BANNER = '/banner/:id',

    NEW_ARRIVAL = '/new-arrival',
    // GET_NEW_ARRIVAL = '/new-arrival/:id',

    GET_FIELDS = '/fields',
    MATCHPAIR_SETTING = '/setting',
    GET_MATCHPAIR_SETTING = '/setting/:id?',
    EDIT_MATCHPAIR_SETTING = '/setting',

    GET_INVENTORY = '/details',
    GET_STOCK = '/stocks',
    SAVED_SEARCH = '/save-search/:id?',
    RECENT_SEARCH = '/recent-search',
    RECENT_SEARCH_BY_ID = '/recent-search/:id',
    FILTER_SEARCH = '/filter-search',
    // SEARCH_PAYLOAD = '/search',
    SEARCH_FILTER = '/search/:id?',

    DIAMOND_DNA = '/dna',
    DIAMOND_ZIP = '/diamond-zip',

    ARRIVAL = '/arrival',
    SEARCH_ARRIVAL = '/search-arrival',
    EXPORT_ARRIVAL = '/export',
    EXPORT_SEARCH = '/export-search',
    CHECK_DIAMOND_STATUS = '/check-diamond-status',
    CLIENT_TRANSACTIONS_COUNT = '/transactions-count',

    CONFIRM_STONE = '/confirm-stone',
    GET_CONFIRM_STONE = '/get-confirm-stone',
    APPROVE_STONE = '/approve-stone',
    REJECT_STONE = '/reject-stone',
    HOLD = '/hold',
    GET_HOLD = '/get-hold',
    RELEASE_HOLD = '/release-hold',
    MEMO = '/memo',
    GET_MEMO = '/get-memo',
    RECEIVE_MEMO = '/receive-memo',
    MEMO_SELL = '/memo-sell',
    CARTS = '/carts',
    GET_CARTS = '/get-carts',
    ENQUIRIES = '/enquiry',
    GET_ENQUIRIES = '/get-enquiry',
    CLOSE_ENQUIRY = '/close-enquiry',
    WATCHLIST = '/watchlist',
    GET_WATCHLIST = '/get-watchlist',
    NOTES = '/notes',
    GET_NOTES = '/get-notes',

    DEMANDS = '/demands/:id?',

    COLLECTIONS = '/collections/:id?',
    DEL_COLLECTIONS = '/collections/:id?',
    COLLECTION_STATUS = '/status/:id?',

    MATCHPAIR_SEARCH = '/matchpair-search',
    SAVED_MATCHPAIR = '/matchpair/:id?',
    MATCHPAIR_BY_ID = '/recent-matchpair/:id?',

    BUSINESS_ASSOCIATE = '/businessassociate',
    GET_ALL_BUSINESS_ASSOCIATE = '/businessassociate',
    GET_BUSINESS_ASSOCIATE_BY_ID = '/businessassociate/:id',
    UPDATE_BUSINESS_ASSOCIATE_BY_ID = '/businessassociate/:id',
    DELETE_BUSINESS_ASSOCIATE_BY_ID = '/businessassociate/:id',
    UPDATE_BUSINESS_ASSOCIATE_PASSWORD = '/change-password/:id',
    BUSINESS_ASSOCIATE_DROPDOWN = '/business-associates-dropdown',

    // Client(User) routes
    ADD_CUSTOMER_BUSSINESS_DATA = '/business/',

    //get all users
    GET_ALL_USERS = '/users',

    // user route
    CREATE_USER = '/user/',
    GET_USER_BUSSINESS_DATA = '/user/:id',
    UPDATE_USER_BY_ID = '/user/:id',
    DELETE_USER_BY_ID = '/user/:id',

    //active_deactive
    BUSSINESS_ACTIVE_STATUS = '/business/:id/status',
    USER_ACTIVE_STATUS = '/user/:id/status',

    //document upload
    ADD_BUSSINESS_DOCUMENTS = '/business/document',
    UPDATE_BUSSINESS_DOCUMENTS = '/business/document',

    //sync inventory_settings
    SYNC_INVENTORY_SETTINGS = '/inventory-settings/:id',

    DELETE_LOGIN_ATTEMPTS = '/login-attempts/:id',
    GET_BUSINESS_DETAILS_IN_EXCEL = '/business-details-excel',
    GET_BUSINESS_ASSOCIATE_DETAILS_IN_EXCEL = '/business-associate-details-excel',
    UNREGISTERED_USERS_SEND_EMAIL = '/unregistered-sendmail/:id?',
    CUSTOMER_DROPDOWN = '/customer-dropdown',
    ADD_CUSTOMER_WITH_BUSINESS = '/add-customer-with-business',

    // Home Page / Dashboard
    DASHBOARD = '/dashboard',
    SHAPE_WISE = '/shape-wise',
    TOTAL_SHAPE_WISE = '/total-shape-wise',
    QUARTER_PERFORMACNE = '/quarter-performance',
    RECENT_KYC = '/recent-kyc',
    RECENT_ACTIVITY = '/recent-activity',
    HIGHEST_RECENT_DEALS = '/high-recents-deals',

    // Search 
    RECENT_SEARCH_DAYWISE = '/recent-search-daywise',
    FILTER_SEARCH_DAYWISE = '/filter-search-daywise',
    SHOW_SELECTED_STOCK = '/show-selected',

    SHARE_DIAMONDS = '/share-diamonds',
    SHARE_MATCHPAIR = '/share-matchpair',

    GET_CONFLICT_DIAMONDS = '/search-conflict-diamonds',

    // Enquiry
    GET_ENQUIRY_COUNT = '/enquiry-count',
    GET_ENQUIRY_COUNTRY = '/enquiry-country',
    GET_ENQUIRY_ALL_DETAILS = '/enquiry-details',
    GET_FUNNEL_CHART = '/funnel-chart',

    GET_LOG_NOTIFICATION = '/log-notification',
    GET_AUDIT_LOG_ACTIONS = '/audit-log-actions',

    // Markups
    //Default markups
    DEFAULT_MARKUP = '/default',
    DEFAULT_MARKUP_UPDATE = '/update-default',
    //Bussiness Plus Provider markup
    BUSINESS_PLUS_PROVIDER_MARKUP = '/business-provider/:id',
    BUSINESS_PLUS_PROVIDER_MARKUP_UPDATE = '/update-business-provider',
    //Bussiness-Associate markup
    BUSINESS_ASSOCIATE_MARKUP = '/businessassociate',
    BUSINESS_ASSOCIATE_MARKUP_UPDATE = '/update-businessassociate',

    DOWNLOAD_ZIP = '/download',
    MATCHPAIR_DOWNLOAD = '/download-matchpair',

    //Send Bulk Email
    SEND_BULK_EMAIL_NOW = '/send-email/:id',
    //All Inventory Diamonds
    ALL_INVENTORY_DIAMONDS = '/inventory-diamonds',

    //External Clients APIs
    EXTERNAL_CLIENT_STATUS = '/status/:id',
    EXTERNAL_CLIENTS_API_FETCH_STOCK = '/fetch-live-stock',

    SYNC_EXISTING_CLIENT_MARKUPS = '/sync-client-markups-for-existing-data',

    // Category (Modules)
    CREATE_CATEGORY = '/category',
    LIST_CATEGORIES = '/category',
    UPDATE_CATEGORY = '/category',
    DELETE_CATEGORY = '/category/:id',

    // Permission (Submodules)
    CREATE_PERMISSION = '/submodule',
    LIST_PERMISSIONS = '/submodule',
    UPDATE_PERMISSION = '/submodule',
    DELETE_PERMISSION = '/submodule/:id',

    // LiveUserCount
    GET_LIVE_USER_COUNT = '/live-user-count',

}

