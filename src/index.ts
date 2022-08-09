import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from "@jupyterlab/application";

import { ISettingRegistry } from "@jupyterlab/settingregistry";

/**
 * Initialization data for the jupyterlab-google-analytics extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: "jupyterlab-google-analytics:plugin",
  autoStart: true,
  requires: [ISettingRegistry],
  activate: async (app: JupyterFrontEnd, settingRegistry: ISettingRegistry) => {
    const setting = await settingRegistry.load(plugin.id);
    const trackingId = setting.get("trackingId").composite as string;

    var ga_url = "https://www.googletagmanager.com/gtag/js?id=" + trackingId;
    const a = document.createElement("script");
    const m = document.getElementsByTagName("script")[0];
    a.async = true;
    a.src = ga_url;
    m.parentNode?.insertBefore(a, m);

    // Activate the Global Site Tag
    const windowAnalytics = window as any;
    windowAnalytics.dataLayer = windowAnalytics.dataLayer || [];
    windowAnalytics.gtag = function () {
      windowAnalytics.dataLayer.push(arguments);
    };

    windowAnalytics.gtag("js", new Date());
    windowAnalytics.gtag("config", trackingId);
  },
};

export default plugin;