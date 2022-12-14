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
  samples_tooltip: "Show sample messages and labels",
  HOME_title: "Delivered home",
  BUSINESS_title: "Delivered to business",
  POSTOFFICE_title: "Delivered to a pickup point",
  LOCKER_title: "Delivered to a locker",
  HOME_desc: "Delivered home on weekdays before 9 p.m.",
  BUSINESS_desc: "Delivered to business on weekdays before 4 p.m.",
  POSTOFFICE_desc: "Delivered to a post office or a pickup point",
  LOCKER_desc: "Delivered to an automated parcel locker",
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
  showAll: "Show whole list >>",
  hideAll: "Show less >>",
  Weight: "Weight per colli",
  "Longest Side": "Longest side of colli",
  "'Available Countries'": "Available Countries",
  "'Show equipment'": "Show Equipment Installation services",
  BOTH: "Service is available when sending shipments to pickup point chosen by the recipient and to recipient home address.",
  HOME: "Service is available when sending shipments to recipient home address.",
  BUSINESS: "Service is available when sending shipments to business address.",
  PUDO: "Service is available when sending shipments to pickup point chosen by the recipient.",
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
  Navbar_txt:
    "This is the Navigation bar. It contains the options to switch language and move between Service Matrix and File Formats tabs.",
  Navbar_Matrix_txt:
    "Service Matrix tab contains the Posti service portfolio and the ability to ",
  Navbar_FileFormats_txt: "File Formats tab contains the message descriptions.",
  Navbar_Language_txt: "Switch language",
  Welcome_txt:
    "Welcome to use Posti Service Matrix! The purpose of this application is to introduce you to Posti service portfolio and familiarize you with the ways to intergrate with Posti. Jump to a specific topic on the tour by clicking on the menu or click next to get the whole tour experience.",
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
  samples_tooltip: "Näytä mallisanomat ja osoitekorttimalli",
  HOME_title: "Kotiin toimitettava lähetys",
  HOME_desc: "Toimitetaan kotiin arkipäivinä klo 21 mennessä",
  BUSINESS_title: "Yritykseen toimitettava lähetys",
  BUSINESS_desc: "Toimitetaan yritykseen arkipäivinä klo 16 mennessä",
  POSTOFFICE_title: "Toimipisteestä noudettava lähetys",
  POSTOFFICE_desc: "Postitoimipaikasta tai noutopisteestä noudettava lähetys",
  LOCKER_title: "Pakettiautomaatista noudettava lähetys",
  LOCKER_desc: "Pakettiautomaatista noudettava lähetys",
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
  showAll: "Näytä koko lista >>",
  hideAll: "Sulje lista >>",
  Weight: "Kollin paino",
  Routes: "Reitit",
  Dimensions: "Mittatiedot",
  Width: "Leveys",
  Depth: "Syvyys",
  Height: "Korkeus",
  Circumference: "Ympärysmitta",
  "Longest Side": "Kollin pisin sivu",
  "Delivery Location": "Toimituspaikka",
  "Service Group": "Palveluryhmä",
  "Departure Country": "Lähtömaa",
  "Destination Country": "Kohdemaa",
  "Additional Service": "Lisäpalvelu",
  "'Available Countries'": "Sallitut maat",
  "'Show equipment'": "Näytä laiteasennuspalvelut",
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
  "Additional service": "Lisäpalvelu",
  "is required when colli weight exceeds":
    "on lisättävä, kun kollin paino ylittää",
  "is required when longest side of the colli exceeds":
    "on lisättävä, kun kollin pisin sivu ylittää",
  "and longest side of the colli exceeds": "sekä kollin pisin sivu ylittää",
  NOTE: "HUOM",
  Navigation: "Navigointi",
  Navbar: "Navigointivalikko",
  Next: "Seuraava",
  Back: "Edellinen",
};

function loadLanguages(language: string) {
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
      if (!result[record.ServiceGroup + "_desc"]) {
        result[record.ServiceGroup + "_desc"] =
          record.ServiceGroupDescriptionEN;
      }
    } else {
      result[record.ServiceCode] = record.DisplayNameFI;
      result[record.ServiceCode + "_tooltip"] = record.DescriptionFI;
      if (!result[record.ServiceGroup + "_desc"]) {
        result[record.ServiceGroup + "_desc"] =
          record.ServiceGroupDescriptionFI;
      }
    }
    for (let type of record.PackageTypesAndDimensions) {
      if (language === "EN") {
        if (!result[type.PackageType]) {
          result[type.PackageType] = type.DescriptionEN;
        }
      } else {
        if (!result[type.PackageType]) {
          result[type.PackageType] = type.DescriptionFI;
        }
      }
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
    if (record.LabelInstructions.length > 0) {
      for (let label of record.LabelInstructions) {
        if (language === "EN") {
          result[record.LabelType + "_" + label.FieldID + "_name"] =
            label.DisplayNameEN;
          result[record.LabelType + "_" + label.FieldID + "_mandatory"] =
            label.Mandatory;
          result[record.LabelType + "_" + label.FieldID + "_description"] =
            label.DescriptionEN;
          result[record.LabelType + "_" + label.FieldID + "_fontSize"] =
            label.FontSize;
          result[record.LabelType + "_" + label.FieldID + "_bold"] = label.Bold;
        } else {
          result[record.LabelType + "_" + label.FieldID + "_name"] =
            label.DisplayNameFI;
          result[record.LabelType + "_" + label.FieldID + "_mandatory"] =
            label.Mandatory;
          result[record.LabelType + "_" + label.FieldID + "_description"] =
            label.DescriptionFI;
          result[record.LabelType + "_" + label.FieldID + "_fontSize"] =
            label.FontSize;
          result[record.LabelType + "_" + label.FieldID + "_bold"] = label.Bold;
        }
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
    for (let messageRecord of record.Records) {
      for (let validation of messageRecord.Validations) {
        if (language === "EN") {
          result[messageRecord.Name + "_" + validation.ValidationValue] =
            validation.DisplayNameEN;
        } else {
          result[messageRecord.Name + "_" + validation.ValidationValue] =
            validation.DisplayNameFI;
        }
      }
    }
  }
  //console.log(result);
  return result;
}

export default loadLanguages;
