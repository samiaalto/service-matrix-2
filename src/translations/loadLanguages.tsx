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
  navigation: "Navigation",
  navigation_desc:
    "In navigation section you learn how to navigate in the application",
  filtering: "Filtering",
  filtering_desc: "In filtering section you learn how to work with the filters",
  serviceMatrix: "Service Matrix",
  serviceMatrix_desc:
    "In Service Matrix section you learn how to use the the Service Matrix",
  services: "Services",
  services_desc:
    "In services section you learn whatkind of information you will find in the application about services",
  additionalServices: "Additional Services",
  additionalServices_desc:
    "In additional services section you learn whatkind of information you will find in the application addtional services",
  samples: "Samples",
  samples_desc:
    "In samples section you will learn how to work with the generated examples",
  fileFormats: "File Formats",
  fileFormats_desc:
    "In file formats section you will learn whatkind of information you will get on the supported file formats",
  Navbar_txt:
    "This is the Navigation bar. It contains the options to switch language and move between Service Matrix and File Formats tabs.",
  Navbar_Matrix_txt:
    "Service Matrix tab contains the Posti service portfolio and the ability to ",
  Navbar_FileFormats_txt: "File Formats tab contains the message descriptions.",
  Navbar_Language_txt: "You can change language in the Language dropdown.",
  Filter_input_txt:
    "Here's a filter to filter services by service attributes like departure country or weight of a colli in the shipment. You can start typing to search attributes in all supported languages or open up the menu and scrolling the options. The filter will automatically refresh after each selection to match the service offering.",
  Filter_menu_txt:
    "Here are the filtering options: Departure Country, Destination Country, Weight per colli, Longest side of the colli, Delivery Location, Service Group, Service and Additional Service",
  Filter_value_txt:
    "Selected options can be found here and cleared by clicking on the clear button one by one found on each selection.",
  Filter_clear_txt:
    "All the selected filtering options can be removed by clicking on the global clear button. This will not affect Service Matrix selections.",
  Welcome_txt:
    "Welcome to use Posti Service Matrix! The purpose of this application is to introduce you to Posti service portfolio and familiarize you with the ways to intergrate with Posti. Jump to a specific topic on the tour by clicking on the menu or click next to get the whole tour experience.",
  ServiceMatrix_txt:
    "This is the Service Matrix. In service matrix you can see which additional services are available for each service. The interactive service Matrix filters out the excluded additional services by clicking checkboxes. There is also additional information about the additional services and services by clicking on the service name.",
  ServiceMatrix_installation_txt:
    "You can filter out the installation services using this switch.",
  ServiceMatrix_reset_txt:
    "Reset button will reset the choices made in the Service Matrix but leave the filtering choises intact.",
  Services_txt:
    "Services are located on the left hand side bar of the Service Matrix. You can click on the service name to get more information about the service.",
  Services_modal_txt:
    "On the popup you can see more detailed information about the service in case. The description, availability, routes and colli dimensions. Also technical integration instructions can be found on each service.",
  Services_modal_tech:
    "On the technical instructions table you can see the mandatory fields needed in the integration message in order to use this service.",
  Services_button_txt:
    "Service button allows you to deactivate other services and filter out the additional services not applicable to the selected service.",
  Services_badge_txt:
    "In some cases you might experience a warning. In this case to be able to send collis which weight more than 25 kg activating an additional service is required.",
  Services_check_txt:
    "By activating the required additional service the warning is removed.",
  AdditionalServices_txt:
    "Additional Services are located in the top bar of the Service Matrix. You can click the additional service to see more information on it.",
  AdditionalServices_modal_txt:
    "On the popup you can see more detailed information about the additional service in case. The description, availability, available countries and mandatory information. Also technical integration instructions can be found on each additional service.",
  AdditionalServices_modal_tech_txt:
    "On the technical instructions table you can see the mandatory fields needed in the integration message in order to use this additional service.",
  Samples_txt:
    "In the samples section you can see how choices are affecting the messages and label.",
  Samples_label_txt:
    "Here you can see the label. Hovering your mouse on top of the items on the label you can see the item specifications ie. barcode specifications.",
  Samples_message_txt:
    "By choosing other tabs you can see the example message generated based on your service and additional service choices in the Service Matrix section. The mandatory changes are highlighted in message.",
  Thankyou_txt: "Hope you enjoy using Posti Service Matrix!",
  welcome: "Welcome",
  thankyou: "Thank you",
  JumpToTopic: "Jump to a topic",
  skipTour: "Skip tour",
  StartTour: "Start the tour here",
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
  navigation: "Navigointi",
  navigation_desc: "Navigointiosiossa opit navigoimaan sovelluksessa",
  filtering: "Suodatus",
  filtering_desc:
    "Suodatusosiossa opit käyttämään palvelu- ja lisäpalvelusuodattimia",
  serviceMatrix: "Palvelumatriisi",
  serviceMatrix_desc: "Palvelumatriisiosiossa opit käyttämään Palvelumatriisia",
  services: "Palvelut",
  services_desc:
    "Palvelut-osiossa opit mitä tietoja palveluista sovelluksesta löytyy",
  additionalServices: "Lisäpalvelut",
  additionalServices_desc:
    "Lisäpalvelut-osiossa opit mitä tietoja lisäpalveluista sovelluksesta löytyy",
  samples: "Esimerkit",
  samples_desc:
    "Esimerkit-osiossa opit millaisia esimerkkejä voit generoida sovelluksessa",
  fileFormats: "Tietuemuodot",
  fileFormats_desc:
    "Tietuemuodot-osiossa opit mitä tietoja sovelluksessa on saatavilla eri Postin tukemista tietuemuodoista",
  thankyou: "Kiitos",
  Welcome_txt:
    "Tervetuloa käyttämään Postin Palvelumatriisia! Sovelluksen tarkoituksena on tutustuttaa sinut Postin palveluportfolioon ja auttaa integroitumaan Postin kuljetuspalveluihin. Alla olevasta valikosta voit hypätä juuri sinua kiinnostavaan aiheeseen ja klikkaamalla Seuraava -painiketta pääset kokemaan koko esittelyn.",
  welcome: "Tervetuloa",
  Navbar_txt:
    "Tässä on navigointivalikko. Navigointivalikosta löytyy kielivalinta sekä siirtymät Palvelumatriisi- ja Tietuemuotovälilehtien välillä.",
  Navbar_Matrix_txt:
    "Palvelumatriisiosio sisältää Postin palvelu- ja lisäpalveluportfolion sekä mahdollisuuden suodattaa palveluita palveluiden ominaisuuksien perusteella.",
  Navbar_FileFormats_txt:
    "Tietuemuodot-osio sisältää Postin tukemien integraatiotietuemuotojen kuvaukset.",
  Navbar_Language_txt:
    "Kielivalinta valikossa voit vaihtaa käyttöliittymän kielen.",
  Filter_input_txt:
    "Suodatusosiossa voit suodattaa palveluita palveluiden ominaisuuksien kuten lähtömaan tai kollin painon mukaan. Voit hakea ominaisuuksia kirjoittamalla ominaisuuksia kaikilla kieliversioilla tai valitsemalla valikosta halutut ominaisuudet. Sovellus päivittää automaattisesti palveluvalikoiman vastaamaan suodattimen valintoja.",
  Filter_menu_txt:
    "Suodatusvaihtoehdot: Lähtömaa, Kohdemaa, Kollin paino, Kollin pisin sivu, Toimituspaikka, Palveluryhmä, Palvelu ja Lisäpalvelu.",
  Filter_value_txt:
    "Valitut suodattimet löytyvät tästä. Yksittäiset valinnat voi poistaa klikkaamalla poista -painiketta, joka löytyy jokaisesta valinnasta.",
  Filter_clear_txt:
    "Kaikki suodattimen valinnat voi poistaa klikkaamalla poista -painiketta. Palvelumatriisin valinnat säilytetään.",
  ServiceMatrix_txt:
    "Tämä on Palvelumatriisi. Palvelumatriisissa näet mitkä lisäpalvelut on saatavilla palveluille. Interaktiivinen Palvelumatriisi suodattaa suodattaa poissuljetut lisäpalvelut klikkaamalla lisäpalvelun aktiiviseksi. Palvelumatriisista löytyy myös lisätietoa palveluista ja lisäpalveluista klikkaamalla palvelun tai lisäpalvelun nimeä.",
  ServiceMatrix_installation_txt:
    "Voit suodattaa esiin asennuspalvelut tämän kytkimen avulla.",
  ServiceMatrix_reset_txt:
    "Resetoi -painike poistaa Palvelumatriisin valinnat mutta säilyttää suodattimen valinnat.",
  Services_txt:
    "Palvelut on listattu Palvelumatriisin vasenpaan laitaan. Klikkaamalla palvelun nimeä saat lisätietoja palvelusta.",
  Services_modal_txt:
    "Palvelusta esitetään kuvaus, saatavuus, reitit sekä kollin mitat. Myös tekniset integrointiohjeet löytyvät jokaiselle palvelulle.",
  Services_modal_tech_txt:
    "Teknisistä ohjeista löydät tiedon siitä mitkä kentät tulee olla mukana tietueessa kyseistä palvelua käytettäessä.",
  Services_button_txt:
    "Palvelupainikkeella voit aktivoida palvelun, joka suodattaa vain kyseiselle palvelulle saatavat lisäpalvelut esiin.",
  Services_badge_txt:
    "Joissain tapauksissa saatat havaita varoituksen. Tässä tapauksessa yli 25 kg kollipaino vaatii lisäpalvelun valitsemisen palvelulle.",
  Services_check_txt: "Valitsemalla vaaditun lisäpalvelun, varoitus poistuu.",
  AdditionalServices_txt:
    "Lisäpalvelut on listattu Palvelumatriisin yläosaan. Klikkaamalla lisäpalvelun nimeä saat lisätietoja lisäpalvelusta.",
  AdditionalServices_modal_txt:
    "Lisäpalvelusta esitetään kuvaus, pakolliset tiedot, sallitut maat sekä poissuljetut lisäpalvelut. Myös tekniset integrointiohjeet löytyvät jokaiselle lisäpalvelulle.",
  AdditionalServices_modal_tech_txt:
    "Teknisistä ohjeista löydät tiedon siitä mitkä kentät tulee olla mukana tietueessa kyseistä lisäpalvelua käytettäessä.",
  Samples_txt:
    "Esimerkit-osiossa näet miten Palvelumatriisin valinnat näkyvät osoitekortilla ja tietueissa.",
  Samples_label_txt:
    "Tässä näet osoitekortin mallin. Viemällä hiiren tietueen esim. viivakoodin päälle näet tietuekuvauksen.",
  Samples_message_txt:
    "Valitsemalla tietuemuodon näet esimerkkisanoman, joka on generoitu Palvelumatriisissa tekemiesi valintojen pohjalta. Pakolliset kentät on korostettu sanomalla.",
  Thankyou_txt: "Toivottavasti nautit Palvelumatriisista!",
  JumpToTopic: "Hyppää aiheeseen",
  skipTour: "Poistu esittelystä",
  Next: "Seuraava",
  Back: "Edellinen",
  StartTour: "Aloita esittely",
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
