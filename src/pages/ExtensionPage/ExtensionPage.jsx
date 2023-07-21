import React, { useEffect } from "react";
import { GoDesktopDownload } from "react-icons/go";
import { Modal } from "antd";

// elements
import Button from "../../elements/Button";

// assets
import pageMainImage from "../../assets/images/Illustration.png";
import "../../assets/styles/pages/extension-page.scss";

function ExtensionPage() {
  useEffect(() => {
    window.electronAPI.downloadExtensionCallback((_, payload) => {
      Modal.success({
        title: "Extension downloaded",
        content: `Extension location is ${payload}`,
        okText: "Show in folder",
        onOk: () => window.electronAPI.openFile(payload),
      });
    });
  }, []);

  return (
    <div className="anwg-extension-page">
      <div className="anwg-extension-page__main-description">
        <h1 className="anwg-extension-page__main-title">Maximize Your Browser with Our Powerful Extension</h1>
        <p className="anwg-extension-page__main-subtitle">
          Our extension is the perfect way to get the most out of your browser.
          With our powerful features, you can browse faster, work smarter, and stay safe online.
          Download our extension today and see what you've been missing!
          <br/>
          <br/>
          With our extension, you'll enjoy a faster, safer, and more efficient browsing experience than ever
          before. Tailored to enhance productivity, protect your privacy, and make the web work
          for you, this extension offers features you never knew you needed.
        </p>

        <p className="anwg-extension-page__main-promotion">
          Upgrade your browser today. Download our extension now!
        </p>

        <Button
          icon={<GoDesktopDownload />}
          onClick={() => window.electronAPI.downloadExtension()}
        >
          Download
        </Button>
      </div>
      <div className="anwg-extension-page__main-image-wrapper">
        <img src={pageMainImage} alt="" className="anwg-extension-page__main-image"/>
      </div>
    </div>
  );
}

export default ExtensionPage;
