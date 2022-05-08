import { get } from "../utils/axios";
import createFile from "../utils/createFile";

// Refactored to handle errors and respond with suitable data
const _get = async (endpoint: string) => {
  const response = await get(endpoint);
  if (!response.error) return response.data;
  return null;
};

const campaigns = async () => {
  return await _get("/v2/sp/campaigns");
};

const adGroups = async () => {
  return await _get("/v2/sp/adGroups");
};

const adGroupBidRecommendations = async (adGroupId: string) => {
  return await _get(`/v2/sp/adGroups/${adGroupId}/bidRecommendations`);
};

const keywords = async () => {
  return await _get("/v2/sp/keywords");
};

const keywordBidRecommendations = async (keywordId: string) => {
  return await _get(`/v2/sp/keywords/${keywordId}/bidRecommendations`);
};

const negativeKeywords = async () => {
  return await _get(`/v2/sp/negativeKeywords`);
};

const campaignNegativeKeywords = async () => {
  return await _get(`/v2/sp/campaignNegativeKeywords`);
};

const adGroupSuggestedKeywords = async (adGroupId: string) => {
  return await _get(`/v2/sp/adGroups/${adGroupId}/suggested/keywords`);
};

const productAds = async () => {
  return await _get(`/v2/sp/productAds`);
};

const productTargets = async () => {
  return await _get(`/v2/sp/targets`);
};

const negativeProductTargets = async () => {
  return await _get(`/v2/sp/negativeTargets`);
};

export default async () => {
  const _campaigns = await campaigns();
  const _adGroups = await adGroups();
  const _keywords = await keywords();
  const _negativeKeywords = await negativeKeywords();
  const _campaignNegativeKeywords = await campaignNegativeKeywords();
  const _productAds = await productAds();
  const _productTargets = await productTargets();
  const _negativeProductTargets = await negativeProductTargets();

  let _bidRecommendations = [];
  let _keywordRecommendations = [];
  let _adGroupSuggestedKeywords = [];

  if (_adGroups && typeof _adGroups === "object") {
    for (var i = 0; i < _adGroups.length; i++) {
      const _bidRecommendation = await adGroupBidRecommendations(
        _adGroups[i].adGroupId
      );
      if (_bidRecommendation) _bidRecommendations.push(_bidRecommendation);
      const _adGroupSuggestedKeyword = await adGroupSuggestedKeywords(
        _adGroups[i].adGroupId
      );
      if (_adGroupSuggestedKeyword)
        _adGroupSuggestedKeywords.push(_adGroupSuggestedKeyword);
    }
  }

  if (_keywords && typeof _keywords === "object") {
    for (var i = 0; i < _keywords.length; i++) {
      const _keywordRecommendation = await keywordBidRecommendations(
        _keywords[i].keywordId
      );
      if (_keywordRecommendation)
        _keywordRecommendations.push(_keywordRecommendation);
    }
  }

  const payload = {
    campaigns: _campaigns,
    adGroups: _adGroups,
    keywords: _keywords,
    bidRecommendations: _bidRecommendations,
    keywordBidRecommendations: _keywordRecommendations,
    adGroupSuggestedKeywords: _adGroupSuggestedKeywords,
    negativeKeywords: _negativeKeywords,
    campaignNegativeKeywords: _campaignNegativeKeywords,
    productAds: _productAds,
    productTargets: _productTargets,
    negativeProductTargets: _negativeProductTargets,
  };
  console.log("creating file: ", payload);

  createFile(payload);
};
