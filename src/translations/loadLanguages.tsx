import additionalServices from "../additionalServices.json";
import services from "../services.json";
import labelInstructions from "../labelInstructions.json";
import countries from "../countries.json";
import fileFormats from "../fileFormats.json";

let en = {
  "'Select Departure Country'": "Select Departure Country",
  "'Select Destination Country'": "Select Destination Country",
  "'Select Language'": "Select Language",
  "'Select Service Group'": "Select Service Group",
  PARCEL: "Parcel Services",
  TRANSPORTUNIT: "Transport Unit Services",
  "'Domestic shipments under 35 kg'": "Domestic shipments under 35 kg",
  "'Domestic shipments above 35 kg'": "Domestic shipments above 35 kg",
  INTERNATIONAL: "International Services",
  FREIGHT: "Freight Services",
  LETTER: "Letter Services",
  "'Select File Format'": "Select File Format",
  "'Filter data'": "Filter Data",
  "'Service Matrix'": "Service Matrix",
  "'File Formats'": "File Formats",
  "'Attribute Name'": "Attribute Name",
  "'M/O/C'": "M/O/C",
  "'is not available for'": "is not available for",
  "'Excluded Additional Services'": "Excluded Additional Services",
  "'Show sample values'": "Show sample values",
  "'Show optional fields'": "Show optional fields",
  "'Technical Instructions'": "Technical Instructions",
  "'Mandatory Information'": "Mandatory Information",
  "'Additional Information'": "Additional Information",
  "'Pickup point chosen by the recipient'":
    "Pickup point chosen by the recipient",
  "'Pickup order'": "Pickup order",
  HomeDelivery: "Delivered home",
  BusinessDelivery: "Delivered to business",
  Pickup: "Delivered to a pickup point",
  Label: "Label",
  Type: "Type",
  Repeat: "Repeat",
  Description: "Description",
  Language: "Language",
  Reset: "Reset",
  English: "English",
  Finnish: "Finnish",
  Code: "Code",
  Service: "Service",
  specs: "Message Specifications",
  version: "Version History",
  BOTH: "Additional service is available when sending shipments to pickup point chosen by the recipient and to recipient home address.",
  HOME: "Additional service is only available when sending shipments to recipient home address.",
  PUDO: "Additional service is only available when sending shipments to pickup point chosen by the recipient.",
  "'in parameter'": "in parameter",
  "'Unsupported value'": "Unsupported value",
  "'Unable to set filters'": "Unable to set filters",
  Yes: "Yes",
  No: "No",
  "'Font size'": "Font size",
  "'Select service'": "Select service",
  "'Select pickup point'": "Select pickup point",
  "'Remove selection'": "Remove selection",
  "'No results for filter value'": "No results for filter value",
};

let fi = {
  "'Select Departure Country'": "Valitse lähtömaa",
  "'Select Destination Country'": "Valitse kohdemaa",
  "'Select Language'": "Valitse kieli",
  "'Select Service Group'": "Valitse tuoteryhmä",
  PARCEL: "Pakettipalvelut",
  TRANSPORTUNIT: "Kuljetusyksikköpalvelut",
  "'Domestic shipments under 35 kg'": "Kotimaan lähetykset alle 35 kg",
  "'Domestic shipments above 35 kg'": "Kotimaan lähetykset yli 35 kg",
  INTERNATIONAL: "Kansainväliset palvelut",
  FREIGHT: "Rahtipalvelut",
  LETTER: "Kirjepalvelut",
  "'Select File Format'": "Valitse tietuemuoto",
  "'Filter data'": "Suodata",
  "'Service Matrix'": "Palvelumatriisi",
  "'File Formats'": "Tietuemuodot",
  "'Attribute Name'": "Attribuutin nimi",
  "'M/O/C'": "M/O/C",
  "'is not available for'": "ei ole saatavilla",
  "'Excluded Additional Services'": "Poissuljetut lisäpalvelut",
  "'Show sample values'": "Näytä esimerkkiarvot",
  "'Show optional fields'": "Näytä vapaaehtoiset kentät",
  "'Technical Instructions'": "Tekniset ohjeet",
  "'Mandatory Information'": "Pakolliset tiedot",
  "'Additional Information'": "Lisätiedot",
  "'Pickup point chosen by the recipient'":
    "Vastaanottajan valitsema noutopiste",
  "'Pickup order'": "Noutotilaus",
  HomeDelivery: "Kotiin toimitettava lähetys",
  BusinessDelivery: "Yritykseen toimitettava lähetys",
  BusinessDelivery_desc: "Toimitetaan yritykseen arkipäivinä klo 16 mennessä",
  Pickup: "Noudettava lähetys",
  Label: "Osoitekortti",
  Type: "Tyyppi",
  Repeat: "Toisto",
  Description: "Kuvaus",
  Language: "Kielivalinta",
  Reset: "Resetoi",
  English: "Englanti",
  Finnish: "Suomi",
  Code: "Koodi",
  Service: "Palvelu",
  specs: "Sanomakuvaus",
  version: "Versiohistoria",
  TRUE: "KYLLÄ",
  FALSE: "EI",
  Attribute: "Atribuutti",
  Mandatory: "Pakollinen",
  Example: "Esimerkki",
  Availability: "Saatavuus",
  BOTH: "Lisäpalvelu on saatavilla asiakkaan valitsemaan noutopisteeseen sekä asiakkaan osoitteeseen lähetettäessä.",
  HOME: "Lisäpalvelu on saatavilla ainoastaan asiakkaan osoitteeseen lähetettäessä.",
  PUDO: "Lisäpalvelu on saatavilla ainoastaan asiakkaan valitsemaan noutopisteeseen",
  Error: "Virhe",
  ago: "sitten",
  "'Unsupported value'": "Ei tuettu arvo",
  "'in parameter'": "parametrissa",
  "'Unable to set filters'": "Filtteriä ei voi asettaa",
  Yes: "Kyllä",
  No: "Ei",
  "'Font size'": "Fontin koko",
  "'Select service'": "Valitse palvelu",
  "'Select pickup point'": "Valitse noutopiste",
  "'Remove selection'": "Poista valinta",
  "'No results for filter value'": "Ei tuloksia hakuarvolla",
};

function loadLanguages(language) {
  let result = {};

  if (language === "EN") {
    result = en;
  } else {
    result = Object.assign(result, fi);
  }

  for (let record of services.records) {
    if (language === "EN") {
      result[record.ServiceCode] = record.DisplayNameEN;
      result[record.ServiceCode + "_tooltip"] = record.DescriptionEN;
    } else {
      result[record.ServiceCode] = record.DisplayNameFI;
      result[record.ServiceCode + "_tooltip"] = record.DescriptionFI;
    }
  }
  for (let record of additionalServices.records) {
    if (language === "EN") {
      result[record.ServiceCode] = record.DisplayNameEN;
      result[record.ServiceCode + "_tooltip"] = record.DescriptionEN;
    } else {
      result[record.ServiceCode] = record.DisplayNameFI;
      result[record.ServiceCode + "_tooltip"] = record.DescriptionFI;
    }
  }
  for (let record of labelInstructions.records) {
    if (language === "EN") {
      result[record.labelType + "_" + record.id + "_name"] = record.nameEN;
      result[record.labelType + "_" + record.id + "_mandatory"] =
        record.mandatory;
      result[record.labelType + "_" + record.id + "_description"] =
        record.descriptionEN;
      if (record.fontSize) {
        result[record.labelType + "_" + record.id + "_fontSize"] =
          record.fontSize;
      }
    } else {
      result[record.labelType + "_" + record.id + "_name"] = record.nameFI;
      result[record.labelType + "_" + record.id + "_mandatory"] =
        record.mandatory;
      result[record.labelType + "_" + record.id + "_description"] =
        record.descriptionFI;
      if (record.fontSize) {
        result[record.labelType + "_" + record.id + "_fontSize"] =
          record.fontSize;
      }
    }
  }
  for (let record of countries.records) {
    if (language === "EN") {
      result[record.CountryCode] = record.DisplayNameEN;
    } else {
      result[record.CountryCode] = record.DisplayNameFI;
    }
  }
  for (let record of fileFormats.records) {
    if (language === "EN") {
      result[record.Name] = record.DisplayNameEN;
      result[record.Name + "_desc"] = record.DescriptionEN;
    } else {
      result[record.Name] = record.DisplayNameFI;
      result[record.Name + "_desc"] = record.DescriptionFI;
    }
  }
  console.log(result);
  return result;
}

export default loadLanguages;
