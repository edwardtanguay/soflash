import { SiteLocation } from "./types";
import * as config from "./config";

const _siteLocation: SiteLocation = import.meta.env.VITE_SITE_LOCATION;
const _devMode = import.meta.env.VITE_SITE_DEVMODE;

export const appVersion = (): string => {
	return "0.121 hideman";
};

export const devMode = (): boolean => {
	if (config.siteIsOnline()) {
		return false;
	}
	return _devMode === "true";
};

export const mockingOnlineSite = (): boolean => {
	return true;
};

export const responsiveWidthBreak = (): number => {
	return 610;
};

export const pointsForWrongAnswer = (): number => {
	return 1;
};

export const pointsForRightAnswer = (): number => {
	return 10;
};

export const siteIsLocal = (): boolean => {
	return _siteLocation === "local";
};

export const siteIsOnline = (): boolean => {
	return _siteLocation !== "local";
};

export const siteLocation = (): SiteLocation => {
	return _siteLocation;
};
