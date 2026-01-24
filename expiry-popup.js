// Global Expiry Popup & Banner - Appears every 5 minutes
(function () {
  // Add the banner HTML to the page
  function addBannerToPage() {
    const bannerHTML = `
      <div id="expiryBanner" class="expiry-banner">
        <div class="expiry-banner-content">
          <span class="expiry-banner-icon">⚠️</span>
          <span class="expiry-banner-text">Your plan will expire today. Please contact Admin: +91 91216 65885</span>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", bannerHTML);
  }

  // Add the popup HTML to the page
  function addPopupToPage() {
    const popupHTML = `
      <div id="expiryPopup" class="expiry-popup-overlay">
        <div class="expiry-popup-content">
          <div class="expiry-popup-header">
            <h3>⚠️ Plan Expiry Notice</h3>
          </div>
          <div class="expiry-popup-body">
            <p>Your plan will expire today. Please contact Admin.</p>
            <p>+91 91216 65885</p>
          </div>
          <div class="expiry-popup-footer">
            <button onclick="closeExpiryPopup()" class="expiry-popup-btn">OK</button>
          </div>
        </div>
      </div>
    `;

    const popupCSS = `
      <style>
        /* Banner Styles */
        .expiry-banner {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
          color: white;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          animation: slideDown 0.5s ease-out;
        }

        .expiry-banner-content {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px 20px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .expiry-banner-icon {
          font-size: 24px;
          margin-right: 12px;
          animation: pulse 2s infinite;
        }

        .expiry-banner-text {
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          flex: 1;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @media (max-width: 768px) {
          .expiry-banner-text {
            font-size: 14px;
          }
          .expiry-banner-icon {
            font-size: 20px;
          }
        }

        /* Popup Styles */
        .expiry-popup-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 10000;
          justify-content: center;
          align-items: center;
          animation: fadeIn 0.3s ease-in-out;
        }

        .expiry-popup-content {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          max-width: 450px;
          width: 90%;
          overflow: hidden;
          animation: slideIn 0.3s ease-out;
        }

        .expiry-popup-header {
          background-color: rgba(255, 255, 255, 0.1);
          padding: 20px;
          text-align: center;
        }

        .expiry-popup-header h3 {
          margin: 0;
          color: #fff;
          font-size: 24px;
          font-weight: 600;
        }

        .expiry-popup-body {
          padding: 30px;
          text-align: center;
        }

        .expiry-popup-body p {
          margin: 0;
          color: #fff;
          font-size: 18px;
          line-height: 1.6;
        }

        .expiry-popup-footer {
          padding: 20px;
          text-align: center;
          background-color: rgba(0, 0, 0, 0.1);
        }

        .expiry-popup-btn {
          background-color: #fff;
          color: #667eea;
          border: none;
          padding: 12px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .expiry-popup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          background-color: #f8f9fa;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      </style>
    `;

    document.body.insertAdjacentHTML("beforeend", popupHTML);
    document.head.insertAdjacentHTML("beforeend", popupCSS);
  }

  // Show popup function
  window.showExpiryPopup = function () {
    const popup = document.getElementById("expiryPopup");
    if (popup) {
      popup.style.display = "flex";
    }
  };

  // Close popup function
  window.closeExpiryPopup = function () {
    const popup = document.getElementById("expiryPopup");
    if (popup) {
      popup.style.display = "none";
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function init() {
    addBannerToPage();
    addPopupToPage();

    // Show popup every 5 minutes (300000 milliseconds)
    setInterval(showExpiryPopup, 300000);

    // Show popup immediately on page load after 2 seconds
    setTimeout(showExpiryPopup, 2000);
  }
})();
