export interface Stock {
  symbol: string
  name: string
  sector: string
  exchange: string
  logo?: string
}

// 100+ Indian stocks from various sectors
export const INDIAN_STOCKS: Stock[] = [
      // Ensure all Adani stocks are present
      { symbol: "ADANIENT.NS", name: "Adani Enterprises", sector: "Conglomerate", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Adani_Enterprises_Limited_Logo.svg/1200px-Adani_Enterprises_Limited_Logo.svg.png" },
      { symbol: "ADANIPORTS.NS", name: "Adani Ports", sector: "Infrastructure", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Adani_Ports_and_Special_Economic_Zone_Limited_logo.svg/1200px-Adani_Ports_and_Special_Economic_Zone_Limited_logo.svg.png" },
      { symbol: "ADANIGREEN.NS", name: "Adani Green Energy", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adani_Green_Energy_logo.svg/1200px-Adani_Green_Energy_logo.svg.png" },
      { symbol: "ADANITRANS.NS", name: "Adani Transmission", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Transmission_logo.svg/1200px-Adani_Transmission_logo.svg.png" },
      { symbol: "ADANIPOWER.NS", name: "Adani Power", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Power_logo.svg/1200px-Adani_Power_logo.svg.png" },
      { symbol: "ADANITOTAL.NS", name: "Adani Total Gas", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Total_Gas_logo.svg/1200px-Adani_Total_Gas_logo.svg.png" },
      { symbol: "ATGL.NS", name: "Adani Total Gas Ltd", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Total_Gas_logo.svg/1200px-Adani_Total_Gas_logo.svg.png" },
      { symbol: "AWL.NS", name: "Adani Wilmar", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Wilmar_logo.svg/1200px-Adani_Wilmar_logo.svg.png" },
    // Adani Group
    { symbol: "ADANIENT.NS", name: "Adani Enterprises", sector: "Conglomerate", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Adani_Enterprises_Limited_Logo.svg/1200px-Adani_Enterprises_Limited_Logo.svg.png" },
    { symbol: "ADANIPORTS.NS", name: "Adani Ports", sector: "Infrastructure", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Adani_Ports_and_Special_Economic_Zone_Limited_logo.svg/1200px-Adani_Ports_and_Special_Economic_Zone_Limited_logo.svg.png" },
    { symbol: "ADANIGREEN.NS", name: "Adani Green Energy", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Adani_Green_Energy_logo.svg/1200px-Adani_Green_Energy_logo.svg.png" },
    { symbol: "ADANITRANS.NS", name: "Adani Transmission", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Transmission_logo.svg/1200px-Adani_Transmission_logo.svg.png" },
    { symbol: "ADANIPOWER.NS", name: "Adani Power", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Power_logo.svg/1200px-Adani_Power_logo.svg.png" },
    { symbol: "ADANITOTAL.NS", name: "Adani Total Gas", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Total_Gas_logo.svg/1200px-Adani_Total_Gas_logo.svg.png" },
    { symbol: "ATGL.NS", name: "Adani Total Gas Ltd", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Total_Gas_logo.svg/1200px-Adani_Total_Gas_logo.svg.png" },
    { symbol: "AWL.NS", name: "Adani Wilmar", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Adani_Wilmar_logo.svg/1200px-Adani_Wilmar_logo.svg.png" },
  // Banking & Financial
  { symbol: "HDFCBANK.NS", name: "HDFC Bank", sector: "Banking", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/HDFC_Bank_logo.svg/1200px-HDFC_Bank_logo.svg.png" },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank", sector: "Banking", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/ICICI_Bank_Logo.svg/1200px-ICICI_Bank_Logo.svg.png" },
  { symbol: "SBIN.NS", name: "State Bank of India", sector: "Banking", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/SBI_logo.svg/1200px-SBI_logo.svg.png" },
  { symbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", sector: "Banking", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Kotak_Mahindra_Bank_logo.svg/1200px-Kotak_Mahindra_Bank_logo.svg.png" },
  { symbol: "AXISBANK.NS", name: "Axis Bank", sector: "Banking", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Axis_Bank_logo.svg/1200px-Axis_Bank_logo.svg.png" },
  { symbol: "BANKBARODA.NS", name: "Bank of Baroda", sector: "Banking", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Bank_of_Baroda_logo.svg/1200px-Bank_of_Baroda_logo.svg.png" },
  { symbol: "BAJFINANCE.NS", name: "Bajaj Finance", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Bajaj_Finance_logo.svg/1200px-Bajaj_Finance_logo.svg.png" },
  { symbol: "BAJAJFINSV.NS", name: "Bajaj Finserv", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Bajaj_Finserv_logo.svg/1200px-Bajaj_Finserv_logo.svg.png" },
  { symbol: "HDFCLIFE.NS", name: "HDFC Life", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/HDFC_Life_logo.svg/1200px-HDFC_Life_logo.svg.png" },
  { symbol: "SBILIFE.NS", name: "SBI Life", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/SBI_Life_Insurance_logo.svg/1200px-SBI_Life_Insurance_logo.svg.png" },
  { symbol: "ICICIPRULI.NS", name: "ICICI Prudential", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/ICICI_Prudential_Logo.svg/1200px-ICICI_Prudential_Logo.svg.png" },
  { symbol: "LICI.NS", name: "LIC India", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Life_Insurance_Corporation_of_India_logo.svg/1200px-Life_Insurance_Corporation_of_India_logo.svg.png" },
  { symbol: "SHRIRAMFIN.NS", name: "Shriram Finance", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Shriram_Finance_logo.svg/1200px-Shriram_Finance_logo.svg.png" },

  // High-gain stocks
  { symbol: "DBOL.NS", name: "Dhampur Bio Organics", sector: "Chemicals", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Dhampur_Sugar_Mills_logo.svg/1200px-Dhampur_Sugar_Mills_logo.svg.png" },
  { symbol: "KAPSTON.NS", name: "Kapston Facilities", sector: "Infrastructure", exchange: "NSE", logo: "https://www.kapstonfm.com/assets/images/logo.png" },
  { symbol: "ANTELOPUS.NS", name: "Antelopus", sector: "IT", exchange: "NSE", logo: "https://antelopus.in/assets/images/logo.png" },
  { symbol: "AWHCL.NS", name: "Akums Drugs", sector: "Pharma", exchange: "NSE", logo: "https://www.akums.in/images/logo.png" },
  { symbol: "EKC.NS", name: "Everest Kanto Cylinder", sector: "Industrials", exchange: "NSE", logo: "https://www.everestkanto.com/images/logo.png" },
  { symbol: "JPOLYINVST.NS", name: "Jindal Poly Investment", sector: "Finance", exchange: "NSE", logo: "https://www.jindalpoly.com/images/logo.png" },
  { symbol: "CONSOFINVT.NS", name: "Consolidated Finvest", sector: "Finance", exchange: "NSE", logo: "https://www.consolidatedfinvest.com/images/logo.png" },
  { symbol: "UMIYA.NS", name: "Umiya", sector: "Chemicals", exchange: "NSE", logo: "https://www.umiyachemicals.com/images/logo.png" },
  { symbol: "SILVER360.NS", name: "Silver360", sector: "ETF", exchange: "NSE", logo: "https://www.silver360.com/images/logo.png" },
  { symbol: "KITEX.NS", name: "Kitex Garments", sector: "Consumer", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Kitex_logo.svg/1200px-Kitex_logo.svg.png" },
  { symbol: "SGMART.NS", name: "SG Mart", sector: "Retail", exchange: "NSE", logo: "https://www.sgsupermart.com/images/logo.png" },
  { symbol: "HOMEFIRST.NS", name: "Home First Finance", sector: "Finance", exchange: "NSE", logo: "https://www.homefirstindia.com/images/logo.png" },

  // IT & Technology
  { symbol: "TCS.NS", name: "TCS", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/1200px-Tata_Consultancy_Services_Logo.svg.png" },
  { symbol: "INFY.NS", name: "Infosys", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png" },
  { symbol: "HCLTECH.NS", name: "HCL Technologies", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/HCL_Technologies_Logo.svg/1200px-HCL_Technologies_Logo.svg.png" },
  { symbol: "WIPRO.NS", name: "Wipro", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Wipro_logo.svg/1200px-Wipro_logo.svg.png" },
  { symbol: "TECHM.NS", name: "Tech Mahindra", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Tech_Mahindra_logo.svg/1200px-Tech_Mahindra_logo.svg.png" },
  { symbol: "LTIM.NS", name: "LTIMindtree", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/LTIMindtree_logo.svg/1200px-LTIMindtree_logo.svg.png" },
  { symbol: "PERSISTENT.NS", name: "Persistent Systems", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Persistent_Systems_logo.svg/1200px-Persistent_Systems_logo.svg.png" },
  { symbol: "COFORGE.NS", name: "Coforge", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Coforge_logo.svg/1200px-Coforge_logo.svg.png" },
  { symbol: "TATAELXSI.NS", name: "Tata Elxsi", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Tata_Elxsi_logo.svg/1200px-Tata_Elxsi_logo.svg.png" },

  // Core Manufacturing & Industrials
  { symbol: "LT.NS", name: "Larsen & Toubro", sector: "Infrastructure", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Larsen_%26_Toubro_Logo.svg/1200px-Larsen_%26_Toubro_Logo.svg.png" },
  { symbol: "SIEMENS.NS", name: "Siemens India", sector: "Industrials", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Siemens_logo.svg/1200px-Siemens_logo.svg.png" },
  { symbol: "ABB.NS", name: "ABB India", sector: "Industrials", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/ABB_logo.svg/1200px-ABB_logo.svg.png" },
  { symbol: "CUMMINSIND.NS", name: "Cummins India", sector: "Industrials", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Cummins_Inc_logo.svg/1200px-Cummins_Inc_logo.svg.png" },
  { symbol: "THERMAX.NS", name: "Thermax", sector: "Industrials", exchange: "NSE", logo: "https://via.placeholder.com/200?text=THERMAX" },
  { symbol: "BHARATFORG.NS", name: "Bharat Forge", sector: "Industrials", exchange: "NSE", logo: "https://via.placeholder.com/200?text=BHARAT+FORGE" },
  { symbol: "AIAENG.NS", name: "AIA Engineering", sector: "Industrials", exchange: "NSE", logo: "https://via.placeholder.com/200?text=AIA+ENG" },
  { symbol: "CGPOWER.NS", name: "CG Power", sector: "Industrials", exchange: "NSE", logo: "https://via.placeholder.com/200?text=CG+POWER" },

  // Automobile & Auto Ancillary
  { symbol: "MARUTI.NS", name: "Maruti Suzuki", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Maruti_Suzuki_Logo.svg/1200px-Maruti_Suzuki_Logo.svg.png" },
  { symbol: "TATAMOTORS.NS", name: "Tata Motors", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Tata_Motors_logo.svg/1200px-Tata_Motors_logo.svg.png" },
  { symbol: "M&M.NS", name: "Mahindra & Mahindra", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Mahindra_logo.svg/1200px-Mahindra_logo.svg.png" },
  { symbol: "BAJAJ-AUTO.NS", name: "Bajaj Auto", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Bajaj_Auto_logo.svg/1200px-Bajaj_Auto_logo.svg.png" },
  { symbol: "HEROMOTOCO.NS", name: "Hero MotoCorp", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Hero_MotoCorp_logo.svg/1200px-Hero_MotoCorp_logo.svg.png" },
  { symbol: "EICHERMOT.NS", name: "Eicher Motors", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Eicher_Motors_logo.svg/1200px-Eicher_Motors_logo.svg.png" },
  { symbol: "ASHOKLEY.NS", name: "Ashok Leyland", sector: "Automobile", exchange: "NSE", logo: "https://via.placeholder.com/200?text=ASHOK+LEYLAND" },
  { symbol: "TVSMOTOR.NS", name: "TVS Motor", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/TVS_Motor_Company_Logo.svg/1200px-TVS_Motor_Company_Logo.svg.png" },
  { symbol: "BOSCHLTD.NS", name: "Bosch India", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bosch-Logo.svg/1200px-Bosch-Logo.svg.png" },
  { symbol: "MOTHERSUMI.NS", name: "Motherson Sumi", sector: "Automobile", exchange: "NSE", logo: "https://via.placeholder.com/200?text=MOTHERSON+SUMI" },

  // Energy, Power & Utilities
  { symbol: "RELIANCE.NS", name: "Reliance Industries", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Reliance_Industries_Logo.svg/1200px-Reliance_Industries_Logo.svg.png" },
  { symbol: "ONGC.NS", name: "ONGC", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/ONGC_logo.svg/1200px-ONGC_logo.svg.png" },
  { symbol: "NTPC.NS", name: "NTPC", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/NTPC_Logo.svg/1200px-NTPC_Logo.svg.png" },
  { symbol: "POWERGRID.NS", name: "Power Grid Corporation", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Power_Grid_Corporation_of_India_logo.svg/1200px-Power_Grid_Corporation_of_India_logo.svg.png" },
  { symbol: "TATAPOWER.NS", name: "Tata Power", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Tata_Power_logo.svg/1200px-Tata_Power_logo.svg.png" },
  { symbol: "ADANIPORTS.NS", name: "Adani Ports", sector: "Infrastructure", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Adani_Ports_and_Special_Economic_Zone_Limited_logo.svg/1200px-Adani_Ports_and_Special_Economic_Zone_Limited_logo.svg.png" },
  { symbol: "COALINDIA.NS", name: "Coal India", sector: "Mining", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Coal_India_Limited_logo.svg/1200px-Coal_India_Limited_logo.svg.png" },
  { symbol: "GAIL.NS", name: "GAIL", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/GAIL_logo.svg/1200px-GAIL_logo.svg.png" },
  { symbol: "IOC.NS", name: "Indian Oil Corporation", sector: "Energy", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/IndianOil_Logotype.svg/1200px-IndianOil_Logotype.svg.png" },

  // Pharma & Healthcare
  { symbol: "SUNPHARMA.NS", name: "Sun Pharma", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Sun_Pharmaceutical_Industries_Ltd._Logo.svg/1200px-Sun_Pharmaceutical_Industries_Ltd._Logo.svg.png" },
  { symbol: "DRREDDY.NS", name: "Dr Reddy's", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Dr_Reddy%27s_Laboratories_Logo.svg/1200px-Dr_Reddy%27s_Laboratories_Logo.svg.png" },
  { symbol: "CIPLA.NS", name: "Cipla", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Cipla_logo.svg/1200px-Cipla_logo.svg.png" },
  { symbol: "DIVISLAB.NS", name: "Divi's Laboratories", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Divis_Laboratories_Logo.svg/1200px-Divis_Laboratories_Logo.svg.png" },
  { symbol: "LUPIN.NS", name: "Lupin", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Lupin_logo.svg/1200px-Lupin_logo.svg.png" },
  { symbol: "TORNTPHARM.NS", name: "Torrent Pharma", sector: "Pharma", exchange: "NSE", logo: "https://via.placeholder.com/200?text=TORRENT" },
  { symbol: "ALKEM.NS", name: "Alkem Laboratories", sector: "Pharma", exchange: "NSE", logo: "https://via.placeholder.com/200?text=ALKEM" },
  { symbol: "APOLLOHOSP.NS", name: "Apollo Hospitals", sector: "Healthcare", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Apollo_Hospitals_Logo.svg/1200px-Apollo_Hospitals_Logo.svg.png" },
  { symbol: "FORTIS.NS", name: "Fortis Healthcare", sector: "Healthcare", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Fortis_Healthcare_Logo.svg/1200px-Fortis_Healthcare_Logo.svg.png" },

  // FMCG & Consumer
  { symbol: "HINDUNILVR.NS", name: "Hindustan Unilever", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Hindustan_Unilever_Logo.svg/1200px-Hindustan_Unilever_Logo.svg.png" },
  { symbol: "ITC.NS", name: "ITC", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/ITC_Limited_logo.svg/1200px-ITC_Limited_logo.svg.png" },
  { symbol: "NESTLEIND.NS", name: "Nestlé India", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nestle_logo.svg/1200px-Nestle_logo.svg.png" },
  { symbol: "BRITANNIA.NS", name: "Britannia", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Britannia_Industries_Logo.svg/1200px-Britannia_Industries_Logo.svg.png" },
  { symbol: "TATACONSUM.NS", name: "Tata Consumer Products", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Tata_Consumer_Products_Logo.svg/1200px-Tata_Consumer_Products_Logo.svg.png" },
  { symbol: "DABUR.NS", name: "Dabur", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dabur_logo.svg/1200px-Dabur_logo.svg.png" },
  { symbol: "GODREJCP.NS", name: "Godrej Consumer", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Godrej_Consumer_Products_Logo.svg/1200px-Godrej_Consumer_Products_Logo.svg.png" },
  { symbol: "MARICO.NS", name: "Marico", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Marico_logo.svg/1200px-Marico_logo.svg.png" },
  { symbol: "COLPAL.NS", name: "Colgate Palmolive", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Colgate-Palmolive_logo.svg/1200px-Colgate-Palmolive_logo.svg.png" },

  // Metals & Infrastructure
  { symbol: "TATASTEEL.NS", name: "Tata Steel", sector: "Steel", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tata_Steel_logo.svg/1200px-Tata_Steel_logo.svg.png" },
  { symbol: "JSWSTEEL.NS", name: "JSW Steel", sector: "Steel", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/JSW_Steel_Logo.svg/1200px-JSW_Steel_Logo.svg.png" },
  { symbol: "HINDALCO.NS", name: "Hindalco", sector: "Steel", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Hindalco_Industries_Logo.svg/1200px-Hindalco_Industries_Logo.svg.png" },
  { symbol: "VEDL.NS", name: "Vedanta", sector: "Mining", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Vedanta_Resources_Limited_logo.svg/1200px-Vedanta_Resources_Limited_logo.svg.png" },
  { symbol: "JINDALSTEL.NS", name: "Jindal Steel & Power", sector: "Steel", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Jindal_Steel_%26_Power_Ltd_logo.svg/1200px-Jindal_Steel_%26_Power_Ltd_logo.svg.png" },
  { symbol: "NMDC.NS", name: "NMDC", sector: "Mining", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/NMDC_Limited_logo.svg/1200px-NMDC_Limited_logo.svg.png" },
  { symbol: "GRASIM.NS", name: "Grasim Industries", sector: "Cement", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Grasim_Industries_Logo.svg/1200px-Grasim_Industries_Logo.svg.png" },
  { symbol: "ULTRACEMCO.NS", name: "UltraTech Cement", sector: "Cement", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/UltraTech_Cement_Logo.svg/1200px-UltraTech_Cement_Logo.svg.png" },
  { symbol: "AMBUJACEM.NS", name: "Ambuja Cements", sector: "Cement", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ambuja_Cements_Logo.svg/1200px-Ambuja_Cements_Logo.svg.png" },

  // Gold & Silver Related Stocks
  { symbol: "TITAN.NS", name: "Titan Company", sector: "Consumer", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Titan_Company_Limited_Logo.svg/1200px-Titan_Company_Limited_Logo.svg.png" },
  { symbol: "MUTHOOTFIN.NS", name: "Muthoot Finance", sector: "Finance", exchange: "NSE", logo: "https://via.placeholder.com/200?text=MUTHOOT" },
  { symbol: "MANAPPURAM.NS", name: "Manappuram Finance", sector: "Finance", exchange: "NSE", logo: "https://via.placeholder.com/200?text=MANAPPURAM" },
  { symbol: "RAJESHEXPO.NS", name: "Rajesh Exports", sector: "Consumer", exchange: "NSE", logo: "https://via.placeholder.com/200?text=RAJESH+EXPORTS" },
  { symbol: "PCJEWELLER.NS", name: "PC Jeweller", sector: "Consumer", exchange: "NSE", logo: "https://via.placeholder.com/200?text=PC+JEWELLER" },
  { symbol: "KALYANKJIL.NS", name: "Kalyan Jewellers", sector: "Consumer", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Kalyan_Jewellers_logo.svg/1200px-Kalyan_Jewellers_logo.svg.png" },
  { symbol: "SENCO.NS", name: "Senco Gold", sector: "Consumer", exchange: "NSE", logo: "https://via.placeholder.com/200?text=SENCO+GOLD" },
  { symbol: "HINDZINC.NS", name: "Hindustan Zinc", sector: "Mining", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Hindustan_Zinc_Limited_Logo.svg/1200px-Hindustan_Zinc_Limited_Logo.svg.png" },
  { symbol: "GOLDBEES.NS", name: "Nippon India Gold BeES", sector: "ETF", exchange: "NSE", logo: "https://via.placeholder.com/200?text=GOLD+BEES" },
  { symbol: "SILVERBEES.NS", name: "Nippon India Silver BeES", sector: "ETF", exchange: "NSE", logo: "https://via.placeholder.com/200?text=SILVER+BEES" },
  { symbol: "DMART.NS", name: "Avenue Supermarts", sector: "Retail", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/DMart_Logo.svg/1200px-DMart_Logo.svg.png" },
  { symbol: "TRENT.NS", name: "Trent", sector: "Retail", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Trent_logo.svg/1200px-Trent_logo.svg.png" },
  { symbol: "ZOMATO.NS", name: "Zomato", sector: "Technology", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Zomato_Logo.svg/1200px-Zomato_Logo.svg.png" },
  { symbol: "NAUKRI.NS", name: "Info Edge", sector: "Technology", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Naukri_Logo.svg/1200px-Naukri_Logo.svg.png" },
  { symbol: "NYKAA.NS", name: "Nykaa", sector: "Retail", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nykaa_logo.svg/1200px-Nykaa_logo.svg.png" },
  { symbol: "IRCTC.NS", name: "IRCTC", sector: "Services", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Indian_Railway_Catering_and_Tourism_Corporation_logo.svg/1200px-Indian_Railway_Catering_and_Tourism_Corporation_logo.svg.png" },

  // PSU + Strategic Businesses
  { symbol: "BEL.NS", name: "Bharat Electronics", sector: "Defence", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Bharat_Electronics_Limited_logo.svg/1200px-Bharat_Electronics_Limited_logo.svg.png" },
  { symbol: "HAL.NS", name: "HAL", sector: "Defence", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/HAL_Logo.svg/1200px-HAL_Logo.svg.png" },
  { symbol: "BHEL.NS", name: "BHEL", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/BHEL_Logo.svg/1200px-BHEL_Logo.svg.png" },
  { symbol: "RVNL.NS", name: "RVNL", sector: "Infrastructure", exchange: "NSE", logo: "https://via.placeholder.com/200?text=RVNL" },
  { symbol: "IRFC.NS", name: "IRFC", sector: "Finance", exchange: "NSE", logo: "https://via.placeholder.com/200?text=IRFC" },
  { symbol: "RECLTD.NS", name: "REC Ltd", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/REC_Limited_Logo.svg/1200px-REC_Limited_Logo.svg.png" },
  { symbol: "PFC.NS", name: "PFC", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Power_Finance_Corporation_Limited_Logo.svg/1200px-Power_Finance_Corporation_Limited_Logo.svg.png" },
  { symbol: "ENGINERSIN.NS", name: "Engineers India", sector: "Engineering", exchange: "NSE", logo: "https://via.placeholder.com/200?text=EIL" },

  // Additional strong fundamental stocks
  { symbol: "KPITTECH.NS", name: "KPIT Technologies", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/KPIT_Technologies_Ltd_logo.svg/1200px-KPIT_Technologies_Ltd_logo.svg.png" },
  { symbol: "MPHASIS.NS", name: "Mphasis", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Mphasis_logo.svg/1200px-Mphasis_logo.svg.png" },
  { symbol: "TATATECH.NS", name: "Tata Technologies", sector: "IT", exchange: "NSE", logo: "https://via.placeholder.com/200?text=TATA+TECH" },
  { symbol: "CYIENT.NS", name: "Cyient", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cyient_Logo.svg/1200px-Cyient_Logo.svg.png" },
  { symbol: "INTELLECT.NS", name: "Intellect Design Arena", sector: "IT", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Intellect_Design_Arena_Ltd_logo.svg/1200px-Intellect_Design_Arena_Ltd_logo.svg.png" },

  { symbol: "RBLBANK.NS", name: "RBL Bank", sector: "Banking", exchange: "NSE", logo: "https://via.placeholder.com/200?text=RBL+BANK" },
  { symbol: "IDFCFIRSTB.NS", name: "IDFC First Bank", sector: "Banking", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/IDFC_FIRST_Bank_Logo.svg/1200px-IDFC_FIRST_Bank_Logo.svg.png" },
  { symbol: "BANDHANBNK.NS", name: "Bandhan Bank", sector: "Banking", exchange: "NSE", logo: "https://via.placeholder.com/200?text=BANDHAN+BANK" },
  { symbol: "CSBBANK.NS", name: "CSB Bank", sector: "Banking", exchange: "NSE", logo: "https://via.placeholder.com/200?text=CSB+BANK" },
  { symbol: "J&KBANK.NS", name: "J&K Bank", sector: "Banking", exchange: "NSE", logo: "https://via.placeholder.com/200?text=J%26K+BANK" },

  { symbol: "AUROPHARMA.NS", name: "Aurobindo Pharma", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Aurobindo_Pharma_Logo.svg/1200px-Aurobindo_Pharma_Logo.svg.png" },
  { symbol: "BIOCON.NS", name: "Biocon", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Biocon_logo.svg/1200px-Biocon_logo.svg.png" },
  { symbol: "GLENMARK.NS", name: "Glenmark Pharmaceuticals", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Glenmark_Pharmaceuticals_logo.svg/1200px-Glenmark_Pharmaceuticals_logo.svg.png" },
  { symbol: "IPCALAB.NS", name: "Ipca Laboratories", sector: "Pharma", exchange: "NSE", logo: "https://via.placeholder.com/200?text=IPCA+LABS" },
  { symbol: "NATCOPHARM.NS", name: "Natco Pharma", sector: "Pharma", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Natco_Pharma_Logo.svg/1200px-Natco_Pharma_Logo.svg.png" },

  { symbol: "EMAMILTD.NS", name: "Emami", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Emami_Limited_Logo.svg/1200px-Emami_Limited_Logo.svg.png" },
  { symbol: "BAJAJCON.NS", name: "Bajaj Consumer Care", sector: "FMCG", exchange: "NSE", logo: "https://via.placeholder.com/200?text=BAJAJ+CONSUMER" },
  { symbol: "P&G.NS", name: "Procter & Gamble Hygiene", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Procter_and_Gamble_logo.svg/1200px-Procter_and_Gamble_logo.svg.png" },
  { symbol: "JUBLFOOD.NS", name: "Jubilant Foodworks", sector: "FMCG", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Jubilant_FoodWorks_Logo.svg/1200px-Jubilant_FoodWorks_Logo.svg.png" },

  { symbol: "JSWENERGY.NS", name: "JSW Energy", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/JSW_Energy_Logo.svg/1200px-JSW_Energy_Logo.svg.png" },
  { symbol: "ADANIGREEN.NS", name: "Adani Green Energy", sector: "Power", exchange: "NSE", logo: "https://via.placeholder.com/200?text=ADANI+GREEN" },
  { symbol: "SUZLON.NS", name: "Suzlon Energy", sector: "Power", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Suzlon_Energy_Ltd_logo.svg/1200px-Suzlon_Energy_Ltd_logo.svg.png" },
  { symbol: "INOXWIND.NS", name: "Inox Wind", sector: "Power", exchange: "NSE", logo: "https://via.placeholder.com/200?text=INOX+WIND" },
  { symbol: "GREENPANEL.NS", name: "Greenpanel Industries", sector: "Infrastructure", exchange: "NSE", logo: "https://via.placeholder.com/200?text=GREENPANEL" },

  { symbol: "APOLLOTYRE.NS", name: "Apollo Tyres", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Apollo_Tyres_Logo.svg/1200px-Apollo_Tyres_Logo.svg.png" },
  { symbol: "MRF.NS", name: "MRF", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/MRF_Logo.svg/1200px-MRF_Logo.svg.png" },
  { symbol: "EXIDEIND.NS", name: "Exide Industries", sector: "Automobile", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Exide_Logo.svg/1200px-Exide_Logo.svg.png" },
  { symbol: "AMARAJABAT.NS", name: "Amara Raja Batteries", sector: "Automobile", exchange: "NSE", logo: "https://via.placeholder.com/200?text=AMARA+RAJA" },
  { symbol: "ENDURANCE.NS", name: "Endurance Technologies", sector: "Automobile", exchange: "NSE", logo: "https://via.placeholder.com/200?text=ENDURANCE" },

  { symbol: "GODREJPROP.NS", name: "Godrej Properties", sector: "Infrastructure", exchange: "NSE", logo: "https://via.placeholder.com/200?text=GODREJ+PROP" },
  { symbol: "PRESTIGE.NS", name: "Prestige Estates", sector: "Infrastructure", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Prestige_Estates_Projects_Limited_logo.svg/1200px-Prestige_Estates_Projects_Limited_logo.svg.png" },
  { symbol: "OBEROIRLTY.NS", name: "Oberoi Realty", sector: "Infrastructure", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Oberoi_Realty_Limited_logo.svg/1200px-Oberoi_Realty_Limited_logo.svg.png" },
  { symbol: "BRIGADE.NS", name: "Brigade Enterprises", sector: "Infrastructure", exchange: "NSE", logo: "https://via.placeholder.com/200?text=BRIGADE" },
  { symbol: "PHOENIXLTD.NS", name: "Phoenix Mills", sector: "Infrastructure", exchange: "NSE", logo: "https://via.placeholder.com/200?text=PHOENIX+MILLS" },

  { symbol: "RAMCOCEM.NS", name: "Ramco Cement", sector: "Cement", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ramco_Cements_Logo.svg/1200px-Ramco_Cements_Logo.svg.png" },
  { symbol: "SHREECEM.NS", name: "Shree Cement", sector: "Cement", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Shree_Cement_Limited_Logo.svg/1200px-Shree_Cement_Limited_Logo.svg.png" },
  { symbol: "JKCEMENT.NS", name: "JK Cement", sector: "Cement", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/JK_Cement_Logo.svg/1200px-JK_Cement_Logo.svg.png" },
  { symbol: "BIRLACORPN.NS", name: "Birla Corporation", sector: "Cement", exchange: "NSE", logo: "https://via.placeholder.com/200?text=BIRLA+CORP" },
  { symbol: "HEIDELBERG.NS", name: "Heidelberg Cement", sector: "Cement", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Heidelberg_Cement_logo.svg/1200px-Heidelberg_Cement_logo.svg.png" },

  { symbol: "SAIL.NS", name: "Steel Authority of India", sector: "Steel", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/SAIL_Logo.svg/1200px-SAIL_Logo.svg.png" },
  { symbol: "MOIL.NS", name: "MOIL", sector: "Mining", exchange: "NSE", logo: "https://via.placeholder.com/200?text=MOIL" },
  { symbol: "GUJALKALI.NS", name: "Gujarat Alkalies", sector: "Chemicals", exchange: "NSE", logo: "https://via.placeholder.com/200?text=GUJALKALI" },
  { symbol: "TATACHEM.NS", name: "Tata Chemicals", sector: "Chemicals", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Tata_Chemicals_Ltd_Logo.svg/1200px-Tata_Chemicals_Ltd_Logo.svg.png" },

  { symbol: "PAGEIND.NS", name: "Page Industries", sector: "Consumer", exchange: "NSE", logo: "https://via.placeholder.com/200?text=PAGE+IND" },
  { symbol: "VOLTAS.NS", name: "Voltas", sector: "Consumer", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Voltas_Logo.svg/1200px-Voltas_Logo.svg.png" },
  { symbol: "BLUESTARCO.NS", name: "Blue Star", sector: "Consumer", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Blue_Star_Limited_Logo.svg/1200px-Blue_Star_Limited_Logo.svg.png" },
  { symbol: "WHIRLPOOL.NS", name: "Whirlpool of India", sector: "Consumer", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Whirlpool_Corporation_Logo.svg/1200px-Whirlpool_Corporation_Logo.svg.png" },

  { symbol: "IDBI.NS", name: "IDBI Bank", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/IDBI_Bank_logo.svg/1200px-IDBI_Bank_logo.svg.png" },
  { symbol: "M&MFIN.NS", name: "Mahindra & Mahindra Financial", sector: "Finance", exchange: "NSE", logo: "https://via.placeholder.com/200?text=M%26M+FIN" },
  { symbol: "CHOLAFIN.NS", name: "Cholamandalam Investment", sector: "Finance", exchange: "NSE", logo: "https://via.placeholder.com/200?text=CHOLA+FIN" },
  { symbol: "L&TFH.NS", name: "L&T Finance Holdings", sector: "Finance", exchange: "NSE", logo: "https://via.placeholder.com/200?text=L%26T+FH" },
  { symbol: "PNBHOUSING.NS", name: "PNB Housing Finance", sector: "Finance", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/PNB_Housing_Finance_Limited_Logo.svg/1200px-PNB_Housing_Finance_Limited_Logo.svg.png" },

  { symbol: "ABSLAMC.NS", name: "Aditya Birla Sun Life AMC", sector: "Finance", exchange: "NSE", logo: "https://via.placeholder.com/200?text=ABSL+AMC" },
  // --- Added Telecom stocks ---
  { symbol: "BHARTIARTL.NS", name: "Bharti Airtel", sector: "Telecom", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Airtel_logo.svg/1200px-Airtel_logo.svg.png" },
  { symbol: "IDEA.NS", name: "Vodafone Idea", sector: "Telecom", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Vodafone_Idea_logo.svg/1200px-Vodafone_Idea_logo.svg.png" },
  { symbol: "MTNL.NS", name: "MTNL", sector: "Telecom", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/MTNL_Logo.svg/1200px-MTNL_Logo.svg.png" },
  // --- Added Conglomerate stocks ---
  { symbol: "ADANIENT.NS", name: "Adani Enterprises", sector: "Conglomerate", exchange: "NSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Adani_Enterprises_Limited_Logo.svg/1200px-Adani_Enterprises_Limited_Logo.svg.png" },
]

export const INDICES = [
  { symbol: "BTC-INR", name: "BITCOIN", description: "Bitcoin INR" },
  { symbol: "GC=F", name: "GOLD (10g)", description: "Gold 10g 24K INR", type: "metal" },
  { symbol: "SI=F", name: "SILVER (1kg)", description: "Silver 1kg INR", type: "metal" },
  { symbol: "^NSEI", name: "NIFTY 50", description: "NSE Nifty 50 Index" },
  { symbol: "^NSEBANK", name: "BANK NIFTY", description: "NSE Bank Nifty Index" },
  { symbol: "^BSESN", name: "SENSEX", description: "BSE Sensex Index" },
  { symbol: "^CNXIT", name: "NIFTY IT", description: "NSE Nifty IT Index" },
  { symbol: "^IXIC", name: "NASDAQ", description: "Nasdaq Composite Index" },
  { symbol: "^GSPC", name: "S&P 500", description: "S&P 500 Index" },
  { symbol: "^DJI", name: "DOW 30", description: "Dow Jones Industrial Average" },
  { symbol: "^RUT", name: "RUSSELL 2000", description: "Russell 2000 Index" },
  { symbol: "CL=F", name: "CRUDE OIL", description: "Crude Oil WTI" },
  { symbol: "^N225", name: "NIKKEI 225", description: "Nikkei 225 Index" },
]

export const OPTIONS_INDICES = [
  { symbol: "NIFTY_OPT", name: "NIFTY OPTIONS", description: "Nifty 50 Options" },
  { symbol: "BANKNIFTY_OPT", name: "BANKNIFTY OPTIONS", description: "Bank Nifty Options" },
]

export const SECTORS = [
  "All",
  "Energy",
  "IT",
  "Banking",
  "FMCG",
  "Telecom",
  "Infrastructure",
  "Consumer",
  "Automobile",
  "Pharma",
  "Finance",
  "Cement",
  "Power",
  "Steel",
  "Conglomerate",
  "Mining",
  "ETF",
]
