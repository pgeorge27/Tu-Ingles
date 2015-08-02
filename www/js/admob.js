    function onLoad() {
        if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', initApp, false);
        } else {
            initApp();
        }
    }

    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) {
        admobid = {
            banner: 'ca-app-pub-9365506700334816/4286268887',
            interstitial: 'ca-app-pub-9365506700334816/6354550480'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = {
            banner: 'ca-app-pub-9365506700334816/5325252883',
            interstitial: 'ca-app-pub-9365506700334816/8278719285'
        };
    } else {
        admobid = {
            banner: 'ca-app-pub-9365506700334816/5325252883',
            interstitial: 'ca-app-pub-9365506700334816/8278719285'
        };
    }

    function initApp() {
        if (! AdMob ) {
            // alert( 'admob plugin not ready' );
            return;
        }
        initAd();
        // display the banner at startup
        AdMob.createBanner( {adId:admobid.banner} );
        // Interstitial the banner at startup
        // AdMob.prepareInterstitial({adId:admobid.interstitial, autoShow:true});
    }

    function initAd(){
        var defaultOptions = {
            bannerId: admobid.banner,
            interstitialId: admobid.interstitial,
            adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            offsetTopBar: true, // avoid overlapped by status bar, for iOS7+
            bgColor: 'black', // color name, or '#RRGGBB'
            overlap: false,
            // x: integer,      // valid when set position to 0 / POS_XY
            // y: integer,      // valid when set position to 0 / POS_XY
            isTesting: true, // set to true, to receiving test ad for testing purpose
            autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        };
        AdMob.setOptions( defaultOptions );
        registerAdEvents();
    }

    // optional, in case respond to events or handle error
    function registerAdEvents() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function(data){
            // alert('error: ' + data.error +
            //         ', reason: ' + data.reason +
            //         ', adNetwork:' + data.adNetwork +
            //         ', adType:' + data.adType +
            //         ', adEvent:' + data.adEvent); // adType: 'banner' or 'interstitial'
        });
        document.addEventListener('onAdLoaded', function(data){});
        document.addEventListener('onAdPresent', function(data){});
        document.addEventListener('onAdLeaveApp', function(data){});
        document.addEventListener('onAdDismiss', function(data){});
    }