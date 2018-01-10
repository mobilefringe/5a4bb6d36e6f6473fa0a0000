define([], function () {
    return [
        {
            path: '/',
            component: view('home')
        },
        {
            path: '/stores',
            component: view('default'),
            meta: {
                breadcrumb: 'Shops & Dining',
            },
            children: [
                {
                    path: '',
                    component: view('stores'),
                    name: 'storeList'
                },
                {
                    path: '/dine',
                    component: view('dine'),
                    name: 'dineList'
                },
                {
                    path: '/new-doors',
                    component: view('new_stores'),
                    name: 'newStores'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    name: 'storeDetails'
                }
            ]
        },
        {
            path: '/events',
            component: view('default'),
            meta: {
                breadcrumb: 'Events',
            },
            children: [
                {
                    path: '',
                    component: view('events'),
                    name: 'eventList'
                },
                {
                    path: ':id',
                    component: view('events_details'),
                    name: 'eventDetails'
                }
            ]
        },
        {
            path: '/art',
            component: view('default'),
            meta: {
                breadcrumb: 'Art',
            },
            children: [
                {
                    path: '',
                    component: view('art'),
                    name: 'art'
                },
                {
                    path: '/art/special-exhibition',
                    component: view('art_exhibition'),
                    name: 'artSpecialExhibition'
                },
                {
                    path: '/art/photo-gallery',
                    component: view('art_photo_gallery'),
                    name: 'artPhotoGallery'
                },
                {
                    path: ':id',
                    component: view('art_details'),
                    name: 'artDetails'
                }
            ]
        },
        {
            path: '/news',
            component: view('default'),
            meta: {
                breadcrumb: 'News',
            },
            children: [
                {
                    path: '',
                    component: view('news'),
                    name: ''
                },
                {
                    path: ':id',
                    component: view('news_details'),
                    name: 'newsDetails'
                }
            ]
        },
        {
            path: '/visit',
            component: view('default'),
            meta: {
                breadcrumb: 'Visit',
            },
            children: [
                {
                    path: '',
                    component: view('visit'),
                    name: 'storeList'
                },
                {
                    path: '/visit/tourism',
                    component: view('tourism'),
                    name: 'tourism'
                },
            ],
        },
        {
            path: '/our-story',
            component: view('default'),
            meta: {
                breadcrumb: 'Our Story',
            },
            children: [
                {
                    path: '',
                    component: view('our_story'),
                    name: 'default'
                },
                {
                    path: '/our-story/history',
                    component: view('history'),
                    name: 'history'
                },
                {
                    path: '/our-story/landscaping',
                    component: view('landscaping'),
                    name: 'landscaping'
                },
                {
                    path: '/our-story/architecture',
                    component: view('architecture'),
                    name: 'architecture'
                },
                {
                    path: '/our-story/photo-gallery',
                    component: view('story_photo_gallery'),
                    name: 'photoGallery'
                },
            ]
        },
        {
            path: '/magazine',
            component: view('magazine'),
            meta: {
                breadcrumb: 'The Magazine',
            },
            children: [
                {
                    path: '',
                    component: view('magazine'),
                    name: 'magazine'
                },
            ]
        },
        {
            path: '/hours',
            component: view('default'),
            meta: {
                breadcrumb: 'Hours',
            },
            children: [
                {
                    path: '',
                    component: view('hours'),
                    name: 'hours'
                },
            ]
        },
        {
            path: '/holiday',
            component: view('default'),
            meta: {
                breadcrumb: 'Holiday',
            },
            children: [
                {
                    path: '',
                    component: view('holiday'),
                    name: 'holiday'
                },
                {
                    path: '/holiday/performances',
                    component: view('performances'),
                    name: 'holidayPerformances'
                },
                {
                    path: '/holiday/events',
                    component: view('holiday_events'),
                    name: 'holidayEvents'
                },
                {
                    path: '/holiday/activities',
                    component: view('holiday_activities'),
                    name: 'holidayActivities'
                },
                {
                    path: ':id',
                    component: view('holiday_details'),
                    name: 'holidayDetails'
                }
            ]
        },
        {
            path: '/pages',
            component: view('default'),
            redirect: '/404',
            children: [
                {
                    path: ':id',
                    component: view('page_details'),
                    name: 'pageDetails'
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: view('notfoundcomponent')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]

    /**
       * Asynchronously load view (lazy-loading)
       * @param {string} name the filename (basename) of the view to load.
    **/
    function view(name) {
        return function(resolve) {
            require(['vue!' + name + '.vue'], resolve);
        }
    };
});
