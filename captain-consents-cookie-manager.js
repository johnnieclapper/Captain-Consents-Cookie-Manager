(function(){
let gdprSettingsObj = {};
let ls = localStorage.getItem('gdpr_settings');

let analyticInput = document.getElementById('gdprAnalytics');
let marketingInput = document.getElementById('gdprMarketing');

if(ls !== null) {
    console.log("ls", ls);
} else {
    consentBanner();
}

function consentBanner() {
    let container = `<div class="cc--container">
        <div class="cc--wrapper">
            <div class="cc-header">
                <span class="title">Your choice regarding cookies on this site</span>
                <span class="description">We use cookies to optimise site functionality and give you the best possible experience.</span>
            </div>
            <div class="cc-action">
                <span id="ccSettings">Settings</span>
                <span class="btn warning">I Do Not Accept</span>
                <span class="btn success">I Accept</span>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', container);

    document.querySelector('.cc--container .cc-action .btn.success').addEventListener('click', function() {
        gdprSettingsObj = {
            'neccessary':true,
            'preferences':true,
            'statistics':true,
            'marketing':true
        };
        localStorage.setItem('gdpr_settings',JSON.stringify(gdprSettingsObj));
        document.querySelector('.cc--container').classList.add('hidden');
        setTimeout(function(){ 
            document.querySelector('.cc--container').style.display = 'none';
        }, 1200);
    });
    document.querySelector('.cc--container .cc-action .btn.warning').addEventListener('click', function() {
        gdprSettingsObj = {
            'neccessary':true,
            'preferences':false,
            'statistics':false,
            'marketing':false
        };
        localStorage.setItem('gdpr_settings',JSON.stringify(gdprSettingsObj));
        document.querySelector('.cc--container').classList.add('hidden');
        setTimeout(function(){ 
            document.querySelector('.cc--container').style.display = 'none';
        }, 1200);
    });

    document.querySelector('#ccSettings').addEventListener('click', function() {
        document.querySelector('#ccPopup').classList.add('active');
    });
}
    document.querySelector('#ccPopupReveal').addEventListener('click', function() {
        cookieSettingsInputToggle();
        document.querySelector('#ccPopup').classList.add('active');
    });

    function cookieSettingsInputToggle() {
        let ls = localStorage.getItem('gdpr_settings');

        if(ls !== null) {
            let lsObj = JSON.parse(ls);
            if (lsObj.statistics === true) {
                analyticInput.checked = true;
            } else {
                analyticInput.checked = false;
            }
            if (lsObj.marketing === true) {
                marketingInput.checked = true;
            } else {
                marketingInput.checked = false;
            }
        }
    }
    document.querySelector('#gdprConfirmBtn').addEventListener('click', function() {
        gdprSettingsObj = {
            'neccessary':true,
            'preferences':false,
            'statistics': analyticInput.checked ? true : false,
            'marketing': marketingInput.checked ? true : false
        };
        localStorage.setItem('gdpr_settings',JSON.stringify(gdprSettingsObj));
        let cookieBanner = document.querySelector('.cc--container');
        if (cookieBanner !== null) {
            cookieBanner.classList.add('hidden');
            cookieBanner.style.display = 'none';
        }
        document.querySelector('#ccPopup').classList.remove('active');
    })
    
})();
