/* ============================================================================
 * VENDOR
 */

//http://christopherthielen.github.io/ui-router-extras/#/home

try {

    /* Loadash */
    var _ = window._ = require('lodash');

    /* Jquery */
    var $ = window.$ = window.jQuery = require('jquery');
    require('jquery-ui-dist/jquery-ui.js');
    //require('jquery-mousewheel')($);

    /* Bootstrap */
    require('bootstrap-sass');

    /* Jasny - Bootstrap */
    require('jasny-bootstrap/dist/js/jasny-bootstrap');

    /* Moment */
    window.moment = require('moment');
    //require('moment/locale/ca.js');
    //window.moment.locale('ca');

    /* CryptoJS */
    window.CryptoJS = require('crypto-js');

    /* objectToFormData */
    window.objectToFormData = require('./lib/objectToFormData');

    /* Sprintf */
    window.sprintf = require('sprintf-js').sprintf;
    window.vsprintf = require('sprintf-js').vsprintf;

    /* Datatables */
    require('datatables.net');
    require('datatables.net-bs');
    require('datatables.net-responsive');
    require('datatables.net-responsive-bs');
    require('datatables.net-scroller');
    require('datatables.net-select');

    /* SweetAlert */
    require('sweetalert');

    /* Angular */
    require('angular');
    require('angular-loading-bar');
    require('angular-local-storage');
    require('angular-translate');
    require('angular-translate-storage-cookie');
    require('angular-translate-storage-local');
    require('angular-translate-loader-static-files');
    require('angular-translate-loader-partial');
    require('angular-dynamic-locale');
    require('angular-i18n/ca');
    //require('angular-i18n/es');
    //require('angular-i18n/en');
    require('angular-cookies');
    require('angular-animate');
    require('angular-touch');
    require('angular-sanitize');
    require('angular-messages');
    require('angular-aria');
    require('angular-moment');
    require('angular-ui-bootstrap');
    require('restangular');
    require('angular-jwt');
    require('@uirouter/core');
    require('@uirouter/angularjs');
    window._uiRouterDSR = require('@uirouter/dsr'); // https://github.com/ui-router/dsr
    window._uiRouterStickyStates = require('@uirouter/sticky-states'); // https://github.com/ui-router/sticky-states
    window._uiRouterVisualizer = require('@uirouter/visualizer').Visualizer; // https://github.com/ui-router/visualizer
    require('angular-auto-validate');
    require('angular-ladda');
    require('angular-datatables');
    require('angular-confirm');
    require('angular-datepicker');
    require('fullcalendar');
    require('fullcalendar/dist/locale/ca.js');
    require('fullcalendar-scheduler');
    require('angular-ui-calendar');
    //require('./lib/calendar');
    require('angular-fullcalendar');
    require('angular-file-upload');
    require('ui-cropper');
    require('angular-bootstrap-colorpicker');
    require('chosen-js');
    require('angular-chosen-localytics');
    require('angular-ui-tree');
    require('angular-elastic');
    require('ngmap');
    require('angular-ui-sortable');
    require('ng-textarea-enter');
    require('ngSmoothScroll');
    require('angular-bootstrap-lightbox');
    require('angular-filesize-filter');
    require('angular-tablesort');
    require('leaflet');
    require('leaflet-draw');
    var noUiSlider = window.noUiSlider = require('nouislider');
    //require('nouislider-angular');
    //var Raphael = require('raphael');
    //require('jquery-mapael');
    require('sprintf-js/src/angular-sprintf');

    require('textangular');
    require('angular-addtocalendar/dist/addtocalendar.js');
    require('@fancyapps/fancybox');
    const Pusher = require('pusher-js');
    require('pusher-angular');
    window.FileSaver = require('file-saver');
    window.utmObj = require('utm-latlng');

    // Code Mirror
    window.CodeMirror = require('codemirror');
    require('codemirror/mode/htmlmixed/htmlmixed');
    require('codemirror/addon/display/autorefresh');
    require('codemirror/addon/display/fullscreen');
    require('angular-ui-codemirror');


    /* Metis Menu */
    require('metismenu');

} catch (e) {
    console.log('Icebergs: Vendor error => ' + e.message, e);
}

/* ============================================================================
 * ICEBERG
 */

try {

    // Modules
    require('./modules/icebergs');

    // Views
    //require('ngtemplate?module=iceberg!html!./resources/assets/views/home.html');

    // Constants
    require('./constants/app');
    require('./constants/i18n');
    require('./constants/layout');
    require('./constants/states');
    require('./constants/storage');

    // Injects / Config
    require('./injects/cfpLoadingBarProvider');
    require('./injects/envProvider');
    require('./injects/httpProvider');
    require('./injects/jwtOptionsProvider');
    require('./injects/localStorageServiceProvider');
    require('./injects/locationProvider');
    require('./injects/restangularProvider');
    require('./injects/stateProvider');
    require('./injects/tableSortConfigProvider');
    require('./injects/taDecorator');
    require('./injects/translateProvider');
    require('./injects/uiRouterProvider');
    require('./injects/urlRouterProvider');

    // Filters
    require('./filters/nl2br');
    require('./filters/truncate');
    require('./filters/linkify');

    // Services > Infrastructure
    require('./services/infrastructure/envService');
    require('./services/infrastructure/i18nService');

    // Services > Infrastructure > Broadcasting
    require('./services/infrastructure/broadcasting/broadcastService');

    // Services > Infrastructure > Notifications
    require('./services/infrastructure/notifications/notificationService');
    require('./services/infrastructure/notifications/notificationsRepository');
    // Services > Infrastructure > Notifications > Transformers
    require('./services/infrastructure/notifications/transformers/notificationTransformerFactory');

    // Services > Infrastructure > Debug
    require('./services/infrastructure/debug/debugInterceptor');
    require('./services/infrastructure/debug/debugService');
    // Services > Infrastructure > Notifications > Transformers
    require('./services/infrastructure/debug/transformers/debugTransformerFactory');
    // Services > Infrastructure > Notifications > Controllers
    require('./services/infrastructure/debug/controllers/modalViewController');

    // Services > Infrastructure > Items
    require('./services/infrastructure/items/repositoryFactory');
    // Services > Infrastructure > Items > Abstracts
    require('./services/infrastructure/items/abstracts/abstractDynamicCollectionFactory');
    require('./services/infrastructure/items/abstracts/abstractFilterFactory');
    require('./services/infrastructure/items/abstracts/abstractRepositoryFactory');
    require('./services/infrastructure/items/abstracts/abstractFeedRepositoryFactory');
    require('./services/infrastructure/items/abstracts/abstractMultipleFeedRepositoryFactory');
    require('./services/infrastructure/items/abstracts/abstractTransformerFactory');
    // Services > Infrastructure > Items > Traits
    require('./services/infrastructure/items/traits/traitHasItemsFactory');
    require('./services/infrastructure/items/traits/traitHasRepositoryFactory');
    // Services > Infrastructure > Items > Transformers
    require('./services/infrastructure/items/transformers/parentableTransformerFactory');
    require('./services/infrastructure/items/transformers/parentableTreeTransformerFactory');

    // Services > Infrastructure > Utils
    require('./services/infrastructure/utils/cryptFactory');
    require('./services/infrastructure/utils/deferredCallbackFactory');
    require('./services/infrastructure/utils/hashFactory');
    require('./services/infrastructure/utils/extendFactory');
    require('./services/infrastructure/utils/requestInterceptor');
    // Services > Infrastructure > Utils > Abstracts
    require('./services/infrastructure/utils/abstracts/abstractDeferredCallbackFactory');
    require('./services/infrastructure/utils/abstracts/abstractExtendableFactory');
    // Services > Infrastructure > Utils > Traits
    require('./services/infrastructure/utils/traits/traitExecFactory');
    require('./services/infrastructure/utils/traits/traitHasCallbacksFactory');

    // Services > Infrastructure > Events
    require('./services/infrastructure/events/listenersFactory');
    require('./services/infrastructure/events/eventsService');
    // Services > Infrastructure > Events > Abstracts
    require('./services/infrastructure/events/abstracts/abstractListenersFactory');
    require('./services/infrastructure/events/abstracts/abstractEventsFactory');

    // Services > Infrastructure > Modules
    require('./services/infrastructure/modules/modulesCollection');
    require('./services/infrastructure/modules/activeModulesCollection');
    require('./services/infrastructure/modules/availableModulesCollection');
    require('./services/infrastructure/modules/modulesFactory');
    require('./services/infrastructure/modules/modulesService');
    // Services > Infrastructure > Modules > Abstracts
    require('./services/infrastructure/modules/abstracts/abstractModuleFactory');

    // Services > Infrastructure > States
    require('./services/infrastructure/states/statesService');

    // Services > Infrastructure > Storage
    require('./services/infrastructure/storage/storageService');
    require('./services/infrastructure/storage/fileUploaderFactory');
    // Services > Infrastructure > Storage > Traits
    require('./services/infrastructure/storage/traits/traitHasCacheFactory');
    // Services > Infrastructure > Storage > Persistent
    require('./services/infrastructure/storage/persistent/uploaderFactory');
    // Services > Infrastructure > Storage > Persistent > Abstracts
    require('./services/infrastructure/storage/persistent/abstracts/abstractRepositoryPersistentStorageFactory');
    require('./services/infrastructure/storage/persistent/abstracts/abstractFeedRepositoryPersistentStorageFactory');
    // Services > Infrastructure > Storage > Persistent > Traits
    require('./services/infrastructure/storage/persistent/traits/traitHightlightFactory');
    require('./services/infrastructure/storage/persistent/traits/traitPrimaryFactory');

    // Services > UI
    require('./services/ui/alertFactory');
    require('./services/ui/fullscreenService');
    require('./services/ui/layoutService');
    require('./services/ui/metaService');
    require('./services/ui/preloaderService');
    require('./services/ui/tabsService');
    require('./services/ui/uiNormalizeFactory');
    require('./services/ui/uiService');
    require('./services/ui/datatableFieldRenderFactory');
    require('./services/ui/menuCollection');
    require('./services/ui/breadcrumbService');
    require('./services/ui/landingService');
    // Services > UI > Abstracts
    require('./services/ui/abstracts/abstractUiFactory');
    require('./services/ui/abstracts/abstractListFactory');
    require('./services/ui/abstracts/abstractDatatableFactory');
    require('./services/ui/abstracts/abstractVoidFormFactory');
    require('./services/ui/abstracts/abstractFormFactory');
    require('./services/ui/abstracts/abstractTabFactory');
    require('./services/ui/abstracts/abstractFeedFactory');
    // Services > UI > Traits
    require('./services/ui/traits/traitCloneFactory');
    require('./services/ui/traits/traitDeleteFactory');
    require('./services/ui/traits/traitHasScopeFactory');
    require('./services/ui/traits/traitHightlightFactory');
    require('./services/ui/traits/traitPrimaryFactory');

    // Services > Auth
    require('./services/auth/accountsRepository');
    require('./services/auth/authFactory');
    require('./services/auth/authInterceptor');
    require('./services/auth/profileFactory');
    require('./services/auth/profileService');
    require('./services/auth/userService');

    // Services > Common
    // Services > Common > Tags
    require('./services/common/tags/tagsRepository');
    require('./services/common/tags/tagTypesCollection');
    // Services > Common > Tags > Transformers
    require('./services/common/tags/transformers/tagTypeTransformerFactory');
    require('./services/common/tags/transformers/hiddenTagTypeTransformerFactory');
    require('./services/common/tags/transformers/taggableTransformerFactory');
    // Services > Common > Contacts
    // Services > Common > Attachments
    require('./services/common/attachments/attachmentsRepository');
    // Services > Common > Folders
    require('./services/common/folders/foldersFactory');


    // Controllers
    require('./controllers/abstractSimpleControllerFactory');
    require('./controllers/abstractListControllerFactory');
    require('./controllers/abstractFeedControllerFactory');
    require('./controllers/abstractDatatableControllerFactory');
    require('./controllers/abstractVoidFormControllerFactory');
    require('./controllers/abstractFormControllerFactory');
    require('./controllers/abstractEditControllerFactory');
    require('./controllers/abstractViewControllerFactory');
    require('./controllers/abstractPageControllerFactory');
    require('./controllers/abstractPageVoidFormControllerFactory');

    // Controllers > Infrastructure
    require('./controllers/infrastructure/homeController');
    require('./controllers/infrastructure/htmlController');
    require('./controllers/infrastructure/redirectController');
    require('./controllers/infrastructure/landingController');

    // Controllers > Auth
    require('./controllers/auth/loginController');
    require('./controllers/auth/passwordForgotController');
    require('./controllers/auth/passwordRestoreController');

    // Controllers > App
    require('./controllers/app/accountsController');
    require('./controllers/app/appController');
    require('./controllers/app/mainController');

    // Controllers > Profile
    require('./controllers/profile/profileController');
    require('./controllers/profile/profileViewController');
    require('./controllers/profile/profileEditController');
    require('./controllers/profile/profileImageController');
    require('./controllers/profile/profileSettingsController');
    require('./controllers/profile/profileAccessController');

    // Controllers > Attachments
    require('./modules/attachments/controllers/uploaderController');
    require('./modules/attachments/controllers/folderController');


    // Modules > Development
    require('./modules/development/developmentModuleService');

    // Modules > System
    require('./modules/system/systemModuleService');
    // Modules > System > Transformers
    require('./modules/system/transformers/accountParentTransformerFactory');
    require('./modules/system/transformers/accountableTransformerFactory');
    // Modules > System > Accounts
    require('./modules/system/services/accountsRepository');
    require('./modules/system/services/hostnamesRepository');
    require('./modules/system/controllers/accounts/listController');
    require('./modules/system/controllers/accounts/editController');
    require('./modules/system/controllers/accounts/viewController');
    // Modules > System > Accounts > View
    require('./modules/system/controllers/accounts/view/configController');
    require('./modules/system/controllers/accounts/view/editController');
    require('./modules/system/controllers/accounts/view/imageEditController');
    // Modules > System > Accounts > View > Hostnames
    require('./modules/system/controllers/accounts/view/hostnames/listController');
    require('./modules/system/controllers/accounts/view/hostnames/editController');
    // Modules > System > Users
    require('./modules/system/services/usersRepository');
    require('./modules/system/controllers/users/listController');
    require('./modules/system/controllers/users/editController');
    require('./modules/system/controllers/users/passwordController');
    require('./modules/system/controllers/users/accountsController');

    // Modules > Settings
    require('./modules/settings/settingsModuleService');
    require('./modules/settings/settingsTagsModuleService');
    require('./modules/settings/settingsCapabilitiesModuleService');
    require('./modules/settings/controllers/dashboardController');
    // Modules > Settings > Tags
    require('./modules/settings/controllers/tags/listController');
    require('./modules/settings/controllers/tags/editController');
    // Modules > Settings > Capabilities
    // Modules > Settings > Capabilities > Transformers
    require('./modules/settings/transformers/capabilitiesPermissionsByModuleTransformerFactory');
    require('./modules/settings/transformers/roleableTransformerFactory');
    require('./modules/settings/transformers/companiableTransformerFactory');
    require('./modules/settings/transformers/hasCompanyTransformerFactory');
    require('./modules/settings/transformers/hasAccountableProfileTransformerFactory');
    // Modules > Settings > Capabilities > Permissions
    require('./modules/settings/services/capabilitiesPermissionsRepository');
    // Modules > Settings > Capabilities > Roles
    require('./modules/settings/services/capabilitiesRolesRepository');
    require('./modules/settings/controllers/capabilities/roles/listController');
    require('./modules/settings/controllers/capabilities/roles/editController');
    // Modules > Settings > Capabilities > Profiles
    require('./modules/settings/services/capabilitiesProfilesRepository');
    require('./modules/settings/controllers/capabilities/profiles/listController');
    require('./modules/settings/controllers/capabilities/profiles/editController');
    require('./modules/settings/controllers/capabilities/profiles/emailController');
    // Modules > Settings > Capabilities > Companies
    require('./modules/settings/services/capabilitiesCompaniesRepository');
    require('./modules/settings/controllers/capabilities/companies/listController');
    require('./modules/settings/controllers/capabilities/companies/editController');
    require('./modules/settings/controllers/capabilities/companies/imageEditController');

    // Modules > Attachments
    require('./modules/attachments/attachmentsModuleService');
    // Modules > Attachments > Controllers
    require('./modules/attachments/controllers/managerController');

    // Modules > H2O
    require('./modules/h2o/h2oModuleService');
    require('./modules/h2o/h2oCapabilitiesModuleService');
    // Modules > H2O > Directives
    require('./modules/h2o/directives/elementComponent');
    // Modules > H2O > Transformers
    require('./modules/h2o/transformers/cityParentTransformerFactory');
    require('./modules/h2o/transformers/supplyPointParentTransformerFactory');
    require('./modules/h2o/transformers/supplyPointElementTransformerFactory');
    require('./modules/h2o/transformers/elementComponentTransformerFactory');
    require('./modules/h2o/transformers/supplyPointTransformerFactory');
    // Modules > H2O > Cities
    require('./modules/h2o/services/citiesRepository');
    require('./modules/h2o/controllers/cities/listController');
    require('./modules/h2o/controllers/cities/mapController');
    require('./modules/h2o/controllers/cities/editController');
    require('./modules/h2o/controllers/cities/viewController');
    require('./modules/h2o/controllers/cities/view/editController');
    require('./modules/h2o/controllers/cities/view/datasheetController');
    // Modules > H2O > Cities > Tags
    require('./modules/h2o/controllers/cities/tags/listController');
    require('./modules/h2o/controllers/cities/tags/editController');
    // Modules > H2O > Cities > Supply Points
    require('./modules/h2o/controllers/cities/view/supply-points/listController');
    require('./modules/h2o/controllers/cities/view/supply-points/mapController');
    require('./modules/h2o/controllers/cities/view/supply-points/editController');
    require('./modules/h2o/controllers/cities/view/supply-points/viewController');
    require('./modules/h2o/controllers/cities/view/supply-points/mapEditController');
    require('./modules/h2o/controllers/cities/view/supply-points/markersEditController');
    // Modules > H2O > Cities > Supply Point Elements
    require('./modules/h2o/controllers/cities/view/supply-point-elements/listController');
    require('./modules/h2o/controllers/cities/view/supply-point-elements/mapController');
    require('./modules/h2o/controllers/cities/view/supply-point-elements/editController');
    require('./modules/h2o/controllers/cities/view/supply-point-elements/viewController');
    require('./modules/h2o/controllers/cities/view/supply-point-elements/imageController');
    // Modules > H2O > Cities > Supply Point Elements > Components
    require('./modules/h2o/services/elementComponentsRepository');
    // Modules > H2O > Supply Points
    require('./modules/h2o/services/supplyPointsRepository');
    require('./modules/h2o/controllers/supply-points/listController');
    require('./modules/h2o/controllers/supply-points/editController');
    require('./modules/h2o/controllers/supply-points/mapController');
    // Modules > H2O > Supply Point Elements
    require('./modules/h2o/services/supplyPointElementsRepository');
    require('./modules/h2o/services/elementTypesCollection');
    require('./modules/h2o/controllers/supply-point-elements/listController');
    require('./modules/h2o/controllers/supply-point-elements/mapController');
    require('./modules/h2o/controllers/supply-point-elements/editController');

    // Modules > Booking
    require('./modules/booking/bookingModuleService');
    // Modules > Booking > Transformers
    require('./modules/booking/transformers/planesBedroomsTreeTransformerFactory');
    require('./modules/booking/transformers/planesDiningroomsTreeTransformerFactory');
    require('./modules/booking/transformers/planesSystemTagsTransformerFactory');
    require('./modules/booking/transformers/activitiesSystemTagsTransformerFactory');
    require('./modules/booking/transformers/activitiesMealsTransformerFactory');
    require('./modules/booking/transformers/bookTransformer');
    require('./modules/booking/transformers/serviceTransformerFactory');
    require('./modules/booking/transformers/hasDiscountsTransformerFactory');
    require('./modules/booking/transformers/hasBookingTransformerFactory');
    require('./modules/booking/transformers/inscriptionTransformerFactory');
    require('./modules/booking/transformers/hasEnclosurePlaneTransformerFactory');
    require('./modules/booking/transformers/hasServicesTransformerFactory');
    require('./modules/booking/transformers/taggedActivitiesTransformerFactory');
    require('./modules/booking/transformers/taggedPlanesTransformerFactory');
    require('./modules/booking/transformers/hasTaggedActivitiesTransformerFactory');
    require('./modules/booking/transformers/hasProductTransformerFactory');
    // Modules > Booking > Filters
    require('./modules/booking/filters/bookingStatusInitials');
    // Modules > Booking > Trait
    require('./modules/booking/trait/traitInscriptionActionsFactory');
    // Modules > Booking > Bookings
    require('./modules/booking/services/bookingsRepository');
    require('./modules/booking/services/bookingStatusCollection');
    require('./modules/booking/controllers/bookings/prebookController');
    require('./modules/booking/controllers/bookings/bookController');
    require('./modules/booking/controllers/bookings/listController');
    require('./modules/booking/controllers/bookings/viewController');
    require('./modules/booking/controllers/bookings/modals/downloadController');
    require('./modules/booking/controllers/bookings/modals/viewController');
    require('./modules/booking/controllers/bookings/view/editDataController');
    require('./modules/booking/controllers/bookings/view/editClientController');
    require('./modules/booking/controllers/bookings/view/editServicesController');
    require('./modules/booking/controllers/bookings/view/editArrivalDepartureController');
    require('./modules/booking/controllers/bookings/view/editPersonsController');
    require('./modules/booking/controllers/bookings/view/editBedroomsController');
    require('./modules/booking/controllers/bookings/view/editDiningroomsController');
    require('./modules/booking/controllers/bookings/view/editAgreementsController');
    require('./modules/booking/controllers/bookings/view/editRatesController');
    require('./modules/booking/controllers/bookings/view/invoices/newController');
    // Modules > Booking > Inscriptions
    require('./modules/booking/services/inscriptionsRepository');
    require('./modules/booking/services/inscriptionStatusCollection');
    require('./modules/booking/controllers/inscriptions/listController');
    require('./modules/booking/controllers/inscriptions/viewController');
    // Modules > Booking > Calendars
    require('./modules/booking/controllers/calendars/bedroomsController');
    require('./modules/booking/controllers/calendars/diningroomsController');
    require('./modules/booking/controllers/calendars/occupationController');
    // Modules > Booking > Settings
    require('./modules/booking/bookingSettingsModuleService');
    require('./modules/booking/bookingSettingsProductsModuleService');
    require('./modules/booking/bookingSettingsDiscountsModuleService');
    require('./modules/booking/bookingSettingsActivitiesModuleService');
    require('./modules/booking/bookingSettingsPlanesModuleService');
    // Modules > Booking > Settings > Products
    require('./modules/booking/services/productsRepository');
    require('./modules/booking/controllers/settings/products/listController');
    require('./modules/booking/controllers/settings/products/editController');
    require('./modules/booking/controllers/settings/products/tags/listController');
    require('./modules/booking/controllers/settings/products/tags/editController');
    // Modules > Booking > Settings > Services
    require('./modules/booking/services/servicesRepository');
    require('./modules/booking/services/serviceTypesCollection');
    require('./modules/booking/controllers/settings/services//listController');
    require('./modules/booking/controllers/settings/services/editController');
    // Modules > Booking > Planes
    require('./modules/booking/services/tagsFactory');
    require('./modules/booking/services/planesRepository');
    require('./modules/booking/services/enclosurePlanesRepository');
    require('./modules/booking/controllers/settings/planes/listController');
    require('./modules/booking/controllers/settings/planes/editController');
    require('./modules/booking/controllers/settings/planes/viewController');
    require('./modules/booking/controllers/settings/planes/planes/listController');
    require('./modules/booking/controllers/settings/planes/planes/editController');
    //require('./modules/booking/controllers/settings/planes/calendarController');
    //require('./modules/booking/controllers/settings/planes/settingsController');
    require('./modules/booking/controllers/settings/planes/tags/listController');
    require('./modules/booking/controllers/settings/planes/tags/editController');
    // Modules > Booking > Settings > Activities
    require('./modules/booking/services/activitiesRepository');
    require('./modules/booking/controllers/settings/activities/listController');
    require('./modules/booking/controllers/settings/activities/editController');
    require('./modules/booking/controllers/settings/activities/tags/listController');
    require('./modules/booking/controllers/settings/activities/tags/editController');
    // Modules > Booking > Settings > Discount codes
    require('./modules/booking/services/inscriptionDiscountCodesRepository');
    require('./modules/booking/controllers/settings/inscription-discount-codes/listController');
    require('./modules/booking/controllers/settings/inscription-discount-codes/editController');
    // Modules > Booking > Settings > Discount options
    require('./modules/booking/services/inscriptionDiscountOptionsRepository');
    require('./modules/booking/controllers/settings/inscription-discount-options/listController');
    require('./modules/booking/controllers/settings/inscription-discount-options/editController');
    // Modules > Booking > Landing
    // Modules > Booking > Landing > Inscription
    require('./modules/booking/landing/inscriptionController');
    require('./modules/booking/landing/inscriptionChildsCompleteController');
    // Modules > Booking > Landing > Inscription Finish
    require('./modules/booking/landing/inscriptionFinishController');
    require('./modules/booking/landing/inscriptionChildsCompleteFinishController');

    // Modules > CRM
    require('./modules/crm/crmModuleService');
    // Modules > CRM > Services
    require('./modules/crm/services/clientsRepository');
    require('./modules/crm/services/clientsContactsRepository');
    require('./modules/crm/services/clientsFiscalsRepository');
    // Modules > CRM > Transformers
    require('./modules/crm/transformers/hasClientTransformerFactory');
    require('./modules/crm/transformers/hasClientFiscalTransformerFactory');
    require('./modules/crm/transformers/hasClientContactTransformerFactory');
    // Modules > CRM > Clients
    require('./modules/crm/controllers/clients/listController');
    require('./modules/crm/controllers/clients/editController');
    require('./modules/crm/controllers/clients/tags/listController');
    require('./modules/crm/controllers/clients/tags/editController');
    require('./modules/crm/controllers/clients/fiscals/listController');
    require('./modules/crm/controllers/clients/fiscals/editController');
    require('./modules/crm/controllers/clients/viewController');
    require('./modules/crm/controllers/clients/view/editController');
    require('./modules/crm/controllers/clients/view/contacts/listController');
    require('./modules/crm/controllers/clients/view/contacts/editController');
    require('./modules/crm/controllers/clients/modals/editClientController');
    require('./modules/crm/controllers/clients/modals/editClientContactController');

    // Modules > Community
    require('./modules/community/communityModuleService');
    // Modules > Community > Directives
    require('./modules/community/directives/timelineFeedPosts');
    require('./modules/community/directives/timelineFeedPost');
    require('./modules/community/directives/timelineFeedComments');
    require('./modules/community/directives/timelineFeedComment');
    require('./modules/community/directives/timelineElements');
    // Modules > Community > Traits
    require('./modules/community/trait/traitFeedPublishFactory');
    require('./modules/community/trait/traitFeedCommentFactory');
    require('./modules/community/trait/traitFeedActionsFactory');
    // Modules > Community > Traits > Storage
    require('./modules/community/trait/storage/traitFeedActionsFactory');
    // Modules > Community > Services
    require('./modules/community/services/groupsRepository');
    require('./modules/community/services/membersRepository');
    require('./modules/community/services/postsRepository');
    require('./modules/community/services/CommentsRepository');
    require('./modules/community/services/eventsRepository');
    // Modules > Community > Services > Abstracts
    require('./modules/community/services/abstracts/abstractTimelineControllerFactory');
    require('./modules/community/services/abstracts/abstractTimelineFeedFactory');
    // Modules > Community > Transformers
    require('./modules/community/transformers/groupableTransformerFactory');
    require('./modules/community/transformers/timelineTransformerFactory');
    require('./modules/community/transformers/eventTransformerFactory');
    require('./modules/community/transformers/memberTransformerFactory');
    // Modules > Community > Home
    require('./modules/community/controllers/homeController');
    // Modules > Community > Post
    require('./modules/community/controllers/post/viewController');
    require('./modules/community/controllers/post/likesController');
    require('./modules/community/controllers/post/commentLikesController');
    // Modules > Community > Groups
    require('./modules/community/controllers/groups/listController');
    require('./modules/community/controllers/groups/editController');
    require('./modules/community/controllers/groups/viewController');
    require('./modules/community/controllers/groups/view/timelineController');
    require('./modules/community/controllers/groups/view/editController');
    require('./modules/community/controllers/groups/view/membersEditController');
    require('./modules/community/controllers/groups/view/emailController');
    // Modules > Community > Members
    require('./modules/community/controllers/members/listController');
    require('./modules/community/controllers/members/viewController');
    // Modules > Community > Publish
    require('./modules/community/controllers/publish/publishController');
    // Modules > Community > Survey
    require('./modules/community/controllers/survey/surveyController');
    // Modules > Community > Event
    require('./modules/community/controllers/event/listController');
    require('./modules/community/controllers/event/eventController');
    require('./modules/community/controllers/event/viewController');
    require('./modules/community/controllers/event/view/timelineController');
    require('./modules/community/controllers/event/view/editController');
    require('./modules/community/controllers/event/view/emailController');
    require('./modules/community/controllers/event/view/surveyController');

    // Modules > Accounting
    require('./modules/accounting/accountingModuleService');
    // Modules > Accounting > Collections
    require('./modules/accounting/services/paymentMethodsCollection');
    require('./modules/accounting/services/InvoiceStatusCollection');
    require('./modules/accounting/services/PaymentStatusCollection');
    // Modules > Accounting > Transformers
    require('./modules/accounting/transformers/bankParentTransformerFactory');
    require('./modules/accounting/transformers/hasBankAccountTransformerFactory');
    require('./modules/accounting/transformers/hasTaxTransformerFactory');
    require('./modules/accounting/transformers/hasPaymentMethodsTransformerFactory');
    require('./modules/accounting/transformers/IsCorrectiveInvoiceSerieTransformerFactory');
    require('./modules/accounting/transformers/hasTpvTransformerFactory');
    require('./modules/accounting/transformers/hasInvoiceSerieTransformerFactory');
    require('./modules/accounting/transformers/invoiceTransformerFactory');
    require('./modules/accounting/transformers/invoiceableTransformerFactory');
    require('./modules/accounting/transformers/paymentTransformerFactory');
    // Modules > Accounting > Traits
    require('./modules/accounting/trait/traitPaymentActionsFactory');
    // Modules > Accounting > Traits > Storage
    require('./modules/accounting/trait/storage/traitPaymentActionsFactory');
    // Modules > Accounting > Settings
    require('./modules/accounting/accountingSettingsModuleService');
    // Modules > Accounting > Settings > Taxes
    require('./modules/accounting/services/taxesRepository');
    require('./modules/accounting/controllers/settings/taxes/listController');
    require('./modules/accounting/controllers/settings/taxes/editController');
    // Modules > Accounting > Settings > Banks
    require('./modules/accounting/services/banksRepository');
    require('./modules/accounting/controllers/settings/banks/listController');
    require('./modules/accounting/controllers/settings/banks/editController');
    // Modules > Accounting > Settings > Bank Accounts
    require('./modules/accounting/services/bankAccountsRepository');
    require('./modules/accounting/controllers/settings/bank_accounts/listController');
    require('./modules/accounting/controllers/settings/bank_accounts/editController');
    // Modules > Accounting > Settings > TPVs
    require('./modules/accounting/services/tpvsRepository');
    require('./modules/accounting/controllers/settings/tpvs/listController');
    require('./modules/accounting/controllers/settings/tpvs/editController');
    // Modules > Accounting > Settings > Invoice Series
    require('./modules/accounting/services/invoiceSeriesRepository');
    require('./modules/accounting/controllers/settings/invoice_series/listController');
    require('./modules/accounting/controllers/settings/invoice_series/editController');
    // Modules > Accounting > Invoices
    require('./modules/accounting/services/invoicesRepository');
    require('./modules/accounting/services/invoiceFactory');
    require('./modules/accounting/controllers/invoices/listController');
    require('./modules/accounting/controllers/invoices/editController');
    require('./modules/accounting/controllers/invoices/viewController');
    require('./modules/accounting/controllers/invoices/view/editController');
    require('./modules/accounting/controllers/invoices/view/editClientController');
    require('./modules/accounting/controllers/invoices/view/editClientFiscalController');
    require('./modules/accounting/controllers/invoices/view/paymentsController');
    require('./modules/accounting/controllers/invoices/view/payment/modalViewController');
    // Modules > Accounting > Invoices
    require('./modules/accounting/services/paymentsRepository');
    require('./modules/accounting/controllers/payments/listController');
    require('./modules/accounting/controllers/payments/viewController');

    // Modules > Legal
    require('./modules/legal/legalModuleService');
    // Modules > Legal > Accept
    require('./modules/legal/services/acceptPendingLegals');
    require('./modules/legal/controllers/acceptController');
    // Modules > Legal > Settings
    require('./modules/legal/legalSettingsModuleService');
    // Modules > Legal > Settings > Taxes
    require('./modules/legal/services/legalsRepository');
    require('./modules/legal/controllers/settings/legals/listController');
    require('./modules/legal/controllers/settings/legals/editController');

    // Modules > Chat
    require('./modules/chat/chatModuleService');
    require('./modules/chat/controllers/chatController');

    // Modules > RH
    require('./modules/hr/hrModuleService');
    //require('./modules/hr/hrSettingsModuleService');
    require('./modules/hr/controllers/dashboardController');
    require('./modules/hr/controllers/cvController');

    // Directives
    require('./directives/bindHtmlCompile');
    require('./directives/body');
    require('./directives/changeAccount');
    require('./directives/contactBox');
    require('./directives/equalsTo');
    require('./directives/fileBox');
    require('./directives/fileIcon');
    require('./directives/fileManager');
    require('./directives/fileModel');
    require('./directives/folderBox');
    require('./directives/fancyHref');
    require('./directives/formOnChange');
    require('./directives/iboxTools');
    require('./directives/loading');
    require('./directives/lockscreen');
    require('./directives/logout');
    require('./directives/ngThumb');
    require('./directives/nouislider');
    require('./directives/occupationCalendar');
    require('./directives/pageTitle');
    require('./directives/pageWrapper');
    require('./directives/resourcesCalendar');
    require('./directives/sessionLock');
    require('./directives/sideNavigation');
    require('./directives/skSpinner');
    require('./directives/tabSref');
    require('./directives/toggleFullscreen');
    require('./directives/toggleSidebar');
    require('./directives/topNavigation');
    require('./directives/treeSelection');
    require('./directives/wrapper');

    // I18N



} catch (e) {
    console.log('Icebergs: Core error => ' + e.message, e);
}
