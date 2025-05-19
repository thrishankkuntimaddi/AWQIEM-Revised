let currentLocation = 'Delhi';
let carouselIndex = 0;
const suggestions = document.getElementById('recommendationsList');

// Use API key from global config
const API_KEY = window.config ? window.config.OPENWEATHER_API_KEY : '0c286e13d68a43f9f57092b05b610fc6';
const USER_SELECTION_API_KEY = 'edbfbbdfa90eddd01c5e44aeea05d664';
const locationData = {
    Delhi: { AQI: 225, WQI: 45, aqiStatus: "Poor", wqiStatus: "Poor", pollutants: { pm2_5: 150, pm10: 200, o3: 120, no2: 80, so2: 60, co: 10, nh3: 40, Pb: 0.5 }, wqiData: { Temperature: 30, Turbidity: 5, pH: 6, TDS: 800, DO: 4, BOD: 10, Nutrients: 20 } },
    Chennai: { AQI: 67, WQI: 60, aqiStatus: "Moderate", wqiStatus: "Good", pollutants: { pm2_5: 40, pm10: 60, o3: 50, no2: 30, so2: 20, co: 5, nh3: 15, Pb: 0.2 }, wqiData: { Temperature: 28, Turbidity: 3, pH: 7, TDS: 500, DO: 6, BOD: 5, Nutrients: 10 } },
    Hyderabad: { AQI: 87, WQI: 55, aqiStatus: "Moderate", wqiStatus: "Moderate", pollutants: { pm2_5: 50, pm10: 70, o3: 60, no2: 40, so2: 25, co: 6, nh3: 20, Pb: 0.3 }, wqiData: { Temperature: 29, Turbidity: 4, pH: 7, TDS: 600, DO: 5, BOD: 7, Nutrients: 15 } },
    Bengaluru: { AQI: 75, WQI: 50, aqiStatus: "Moderate", wqiStatus: "Moderate", pollutants: { pm2_5: 45, pm10: 65, o3: 55, no2: 35, so2: 22, co: 4, nh3: 18, Pb: 0.25 }, wqiData: { Temperature: 27, Turbidity: 3.5, pH: 7, TDS: 550, DO: 5, BOD: 6, Nutrients: 12 } },
    Mumbai: { AQI: 114, WQI: 65, aqiStatus: "Highly Polluted", wqiStatus: "Good", pollutants: { pm2_5: 80, pm10: 100, o3: 70, no2: 50, so2: 30, co: 8, nh3: 25, Pb: 0.4 }, wqiData: { Temperature: 31, Turbidity: 4.5, pH: 7, TDS: 450, DO: 6, BOD: 4, Nutrients: 8 } },
    Pune: { AQI: 90, WQI: 58, aqiStatus: "Moderate", wqiStatus: "Moderate", pollutants: { pm2_5: 60, pm10: 80, o3: 65, no2: 45, so2: 28, co: 7, nh3: 22, Pb: 0.35 }, wqiData: { Temperature: 28, Turbidity: 3.8, pH: 7, TDS: 580, DO: 5, BOD: 6, Nutrients: 14 } },
    Dharmavaram: { AQI: 80, WQI: 55, aqiStatus: "Moderate", wqiStatus: "Moderate", pollutants: { pm2_5: 50, pm10: 70, o3: 55, no2: 35, so2: 20, co: 5, nh3: 18, Pb: 0.3 }, wqiData: { Temperature: 29, Turbidity: 4, pH: 7, TDS: 600, DO: 5, BOD: 7, Nutrients: 15 } },
    Puttaparthi: { AQI: 75, WQI: 50, aqiStatus: "Moderate", wqiStatus: "Moderate", pollutants: { pm2_5: 45, pm10: 65, o3: 50, no2: 30, so2: 18, co: 4, nh3: 15, Pb: 0.25 }, wqiData: { Temperature: 28, Turbidity: 3.5, pH: 7.1, TDS: 580, DO: 5.2, BOD: 6, Nutrients: 14 } },
    Tirupati: { AQI: 70, WQI: 60, aqiStatus: "Moderate", wqiStatus: "Good", pollutants: { pm2_5: 40, pm10: 60, o3: 45, no2: 25, so2: 15, co: 3, nh3: 12, Pb: 0.2 }, wqiData: { Temperature: 29, Turbidity: 3, pH: 7.2, TDS: 550, DO: 6, BOD: 5, Nutrients: 10 } },
};
const coordMap = {
    Delhi: { lat: 28.7041, lon: 77.1025 },
    Chennai: { lat: 13.0827, lon: 80.2707 },
    Hyderabad: { lat: 17.3850, lon: 78.4867 },
    Bengaluru: { lat: 12.9716, lon: 77.5946 },
    Mumbai: { lat: 19.0760, lon: 72.8777 },
    Pune: { lat: 18.5204, lon: 73.8567 },
    Dharmavaram: { lat: 14.413, lon: 77.716 }, 
    Puttaparthi: { lat: 14.1654, lon: 77.8117 },
    Tirupati: { lat: 13.6288, lon: 79.4192 },
    Anantapur: { lat: 14.6816, lon: 77.6006 },
    Vijayawada: { lat: 16.5062, lon: 80.6480 },
};
const stateDistricts = {
    "Andhra Pradesh": ["Sri Sathya Sai", "Anantapur", "Chittoor", "Tirupati", "Kurnool", "Nellore", "Prakasam", "Guntur", "Krishna", "West Godavari", "East Godavari", "Visakhapatnam", "Vizianagaram", "Srikakulam", "Anakapalli", "Alluri Sitharama Raju", "Bapatla", "Palnadu", "NTR", "YSR Kadapa", "Annamayya", "Kakinada", "Konaseema", "Eluru", "Nandyal"],
    "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Lepa Rada", "Pakke-Kessang", "Shi Yomi", "Subansiri", "Changlang", "Tirap", "Longding", "Namsai", "Lohit", "Anjaw", "Kamle", "Lower Dibang Valley", "Dibang Valley"],
    "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dangs", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bangalore Urban", "Bangalore Rural", "Belagavi", "Bellary", "Bidar", "Vijayapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Ramanagara", "Chikkaballapur", "Yadgir", "Vijayanagara"],
    "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
    "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Hnahthial", "Khawzawl", "Saitual"],
    "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"],
    "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
    "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
    "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", "Medak", "Medchal", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
    "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
    "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"]
};
const districtAreas = {
    "Alluri Sitharama Raju": ["Chintoor", "Chintapalle", "G. Madugula", "Gangavaram", "Hukumpeta", "Koyyuru", "Kunavaram", "Maredumilli", "Paderu", "Pedabayalu", "Rajavommangi", "Rampachodavaram", "Y. Ramavaram"],
    "Anakapalli": ["Butchayyapeta", "Cheedikada", "Chodavaram", "Devarapalli", "Golugonda", "K. Kotapadu", "Kasimkota", "Kotauratla", "Makavarapalem", "Munagapaka", "Nakkapalli", "Nathavaram", "Payakaraopeta", "Ravikamatham", "Rolugunta", "S. Rayavaram", "Yelamanchili"],
    "Anantapur": ["Agali", "Amadagur", "Amarapuram", "Anantapur", "Atmakur", "Bathalapalli", "Beluguppa", "B.K. Samudram", "Bommanahal", "Brahmasamudram", "Bukkapatnam", "Chilamathur", "C.K. Palli", "D. Hirehal", "Dharmavaram", "Gandlapenta", "Gooty", "Gorantla", "Gudibanda", "Gummagatta", "Hindupur", "Kadiri", "Kambadur", "Kanaganapalli", "Kanekal", "Kothacheruvu", "Kudair", "Kundurpi", "Lepakshi", "Madakasira", "Mudigubba", "Nallamada", "Narpala", "Pamidi", "Parigi", "Peddavadugur", "Peddapappur", "Penukonda", "Puttaparthi", "Ramagiri", "Raptadu", "Rayadurg", "Roddam", "Rolla", "Settur", "Singanamala", "Somandepalli", "Tadimarri", "Tadpatri", "Tanakal", "Uravakonda", "Vajrakarur", "Vidapanakal", "Yadiki", "Yellanur"],
    "Annamayya": ["B. Kothakota", "Chinnamandem", "Gangavaram", "Kalikiri", "Kurabalakota", "Madanapalle", "Mulakalacheruvu", "Nimmanapalle", "P. N. Palle", "Peddamandyam", "Pileru", "Rajampeta", "Ramasamudram", "Sambepalle", "Shakarampeta", "T. Palle", "Thamballapalle", "Vayalpadu", "Vontimitta"],
    "Bapatla": ["Addanki", "Amruthalur", "Bapatla", "Bhattiprolu", "Cherukupalle", "Chirala", "Inkollu", "J Pangaluru", "Karlapalem", "Korisapadu", "Kothapatnam", "Martur", "Nagaram", "Nizampatnam", "Parchur", "Pittalavanipalem", "Repalle", "Tsundur", "Vemuru", "Yeddanapudi"],
    "Chittoor": ["B.Kothakota", "Bangarupalem", "Buchinaidu Khandriga", "Chinnagottigallu", "Chittoor", "Gangadhara Nellore", "Gudipala", "Gudupalle", "Irala", "K.V.B. Puram", "Karvetinagaram", "Kuppam", "Kurabalakota", "Nagari", "Narayanavaram", "Nindra", "Pakala", "Palamaner", "Peda Thippasamudram", "Peddamandyam", "Pileru", "Punganur", "Puthalapattu", "Ramachandrapuram", "Ramakuppam", "Renigunta", "Rompicharla", "S.R. Puram", "Sadum", "Santhipuram", "Sathyavedu", "Somala", "Thamballapalle", "Thavanampalle", "Tirupati (Rural)", "Tirupati (Urban)", "Vadamalapeta", "Varadaiahpalem", "Vedurukuppam", "Vijayapuram", "Yadamari", "Yerpedu", "Z. Palle"],
    "Dr. B.R. Ambedkar Konaseema": ["Ainavilli", "Alamuru", "Allavaram", "Amalapuram", "Ambajipeta", "Atreyapuram", "Devipatnam", "I. Polavaram", "K. Gangavaram", "Kapileswarapuram", "Katrenikona", "Mamidikuduru", "Malkipuram", "Mummidivaram", "P. Gannavaram", "Pamarru", "Peravali", "R. Pydipala", "Ravulapalem", "Razole", "Sakhinetipalli", "Thallarevu"],
    "East Godavari": ["Addateegala", "Ainavilli", "Alamuru", "Allavaram", "Amalapuram", "Ambajipeta", "Anaparthi", "Atreyapurar", "Biccavolu", "Devipatnam", "Gandepalle", "Gangavaram", "I. Polavaram", "Jaggampeta", "K. Gangavaram", "Kajuluru", "Kakinada (Rural)", "Kakinada (Urban)", "Kapileswarapuram", "Karapa", "Katrenikona", "Kirlampudi", "Korukonda", "Kotananduru", "Kovvur", "Maredumilli", "Mandapeta", "Malkipuram", "Mamidikuduru", "Mummidivaram", "P. Gannavaram", "Pamarru", "Peddapuram", "Pithapuram", "Prathipadu", "Rajahmundry (Rural)", "Rajahmundry (Urban)", "Rajanagaram", "Ramachandrapuram", "Rangampeta", "Ravulapalem", "Razole", "Rayavaram", "Routhulapudi", "Samalkota", "Sankhavaram", "Seethanagaram", "Thallarevu", "Tuni", "U. Kothapalli", "Y. Ramavaram", "Yeleswaram"],
    "Eluru": ["Bhimadole", "Chintalapudi", "Denduluru", "Dwaraka Tirumala", "Eluru", "Ganapavaram", "Kamavarapukota", "Lingapalem", "Mogalthur", "Nallajerla", "Navuduru", "Peda Avutapalli", "Pedapadu", "Pentapadu", "Polavaram", "Tadepalligudem", "Tanuku", "Unguturu", "Velerupadu"],
    "Guntur": ["Amaravati", "Bapatla", "Bellamkonda", "Duggirala", "Edlapadu", "Guntur", "Kakumanu", "Kollipara", "Mangalagiri", "Medikonduru", "Muppalla", "Nagaram", "Nallapadu", "Narasaraopet", "Nekarikallu", "Nuzvid", "Pedakakani", "Pedakurapadu", "Phirangipuram", "Piduguralla", "Ponnur", "Prathipadu", "Rentachintala", "Repalle", "Sattenapalli", "Tadikonda", "Tenali", "Thullur", "Tsundur", "Vatticherukuru", "Veldurthi", "Vinukonda", "Yaddanapudi"],
    "Kakinada": ["Ainavilli", "Alamuru", "Allavaram", "Amalapuram", "Ambajipeta", "Atreyapuram", "Devipatnam", "Gandepalle", "I. Polavaram", "Jaggampeta", "K. Gangavaram", "Kajuluru", "Kakinada (Rural)", "Kakinada (Urban)", "Kapileswarapuram", "Karapa", "Katrenikona", "Kirlampudi", "Korukonda", "Kotananduru", "Maredumilli", "Mandapeta", "Malkipuram", "Mamidikuduru", "Mummidivaram", "P. Gannavaram", "Pamarru", "Peddapuram", "Pithapuram", "Prathipadu", "Rajahmundry (Rural)", "Rajahmundry (Urban)", "Rajanagaram", "Ramachandrapuram", "Rangampeta", "Ravulapalem", "Razole", "Rayavaram", "Routhulapudi", "Samalkota", "Sankhavaram", "Seethanagaram", "Thallarevu", "Tuni", "U. Kothapalli", "Y. Ramavaram", "Yeleswaram"],
    "Krishna": ["A. Konduru", "Agiripalli", "Avanigadda", "Bapulapadu", "Bantumilli", "Challapalli", "Chandarlapadu", "Chatrai", "G. Konduru", "Gampalagudem", "Garikaparru", "Ghantasala", "Gudivada", "Gudlavalleru", "Gudiwada", "Ibrahimpatnam", "Jaggayyapeta", "Kaikaluru", "Kalidindi", "Kanchikacherla", "Kankipadu", "Koduru", "Kruthivennu", "Machilipatnam", "Mandavalli", "Mopidevi", "Movva", "Mudinepalli", "Musunuru", "Mylavaram", "Nagayalanka", "Nandigama", "Nandivada", "Navuduru", "Nuzvid", "Pamarru", "Pedana", "Pedaparupudi", "Penamaluru", "Penuganchiprolu", "Reddigudem", "Thotlavalluru", "Tiruvuru", "Unguturu", "Vatsavai", "Veerullapadu", "Vijayawada (Rural)", "Vijayawada (Urban)", "Vissannapeta", "Vuyyuru"],
    "Kurnool": ["Adoni", "Alur", "Aspari", "Atmakur", "Banaganapalle", "Bandi Atmakur", "Bethamcherla", "C. Belagal", "Chagalamarri", "Chippagiri", "Devanakonda", "Dhone", "Dornipadu", "Gadivemula", "Gonegandla", "Gudur", "Halaharvi", "Holagunda", "J. B. Puram", "Kodumur", "Koilkuntla", "Kolimigundla", "Kosigi", "Kottapalle", "Kowthalam", "Krishnagiri", "Kurnool", "Maddikera", "Mahanandi", "Mantralayam", "Midjil", "Nandavaram", "Nandikotkur", "Nandyal", "Orvakal", "Owk", "Pagidyala", "Pamulapadu", "Panyam", "Pattikonda", "Peapally", "Peddakadabur", "Rudravaram", "Sanjamala", "Sirvel", "Srisailam", "Tuggali", "Uyyalawada", "Veldurthi", "Velgode"],
    "Nandyal": ["Allagadda", "Atmakur", "Banaganapalle", "Bandi Atmakur", "Bethamcherla", "Chagalamarri", "Dhone", "Dornipadu", "Gadivemula", "J. B. Puram", "Koilkuntla", "Kolimigundla", "Mahanandi", "Nandyal", "Owk", "Panyam", "Peapally", "Rudravaram", "Sanjamala", "Sirvel"],
    "NTR": ["A. Konduru", "Chandarlapadu", "G. Konduru", "Ibrahimpatnam", "Jaggayyapeta", "Kanchikacherla", "Kankipadu", "Mylavaram", "Nandigama", "Penuganchiprolu", "Reddigudem", "Vatsavai", "Vijayawada (Rural)", "Vijayawada (Urban)"],
    "Palnadu": ["Ajit Singh Nagar", "Amaravati", "Atchampet", "Bellamkonda", "Durgi", "Edlapadu", "Gurazala", "Machavaram", "Macherla", "Madakasira", "Mangalagiri", "Medikonduru", "Muppalla", "Nagaram", "Narasaraopet", "Nekarikallu", "Nuzvid", "Pedakakani", "Pedakurapadu", "Phirangipuram", "Piduguralla", "Ponnur", "Rentachintala", "Rompicharla", "Sattenapalli", "Tadikonda", "Thullur", "Vatticherukuru", "Vinukonda"],
    "Parvathipuram Manyam": ["Balijipeta", "Bhamini", "Bobbili", "Garugubilli", "Gummalakshmipuram", "Jiyyammavalasa", "Komarada", "Kurupam", "Makkuva", "Pachipenta", "Palakonda", "Parvathipuram", "Ramabhadrapuram", "Seethampeta", "Sitanagaram"],
    "Prakasam": ["Addanki", "Ardhaveedu", "Ballikurava", "Bestavaripeta", "Chandra Sekhara Puram", "Chimakurthi", "Chinaganjam", "Chirala", "Cumbum", "Darsi", "Donakonda", "Dornala", "Giddalur", "Gudluru", "Hanumanthuni Padu", "Inkollu", "Janakavaram Panguluru", "Kanigiri", "Kandukur", "Karraguda", "Kondepi", "Korisapadu", "Kothapatnam", "Lingasamudram", "Maddipadu", "Markapur", "Martur", "Naguluppala Padu", "Ongole", "Pamur", "Parchur", "Peddaravuru", "Podili", "Ponnaluru", "Pullalacheruvu", "Racherla", "Santhamaguluru", "Singarayakonda", "Talluru", "Tangutur", "Tarlupadu", "Tripuranthakam", "Ulavapadu", "Valetivari Palem", "Veligandla", "Vetapalem", "Yeddana Pudi", "Zarugumilli"],
    "Srikakulam": ["Amadalavalasa", "Bhamini", "Burja", "Etcherla", "Gara", "Ganguvarisigadam", "Hiramandalam", "Ichapuram", "Jalumuru", "Kanchili", "Kaviti", "Kotabommali", "Laveru", "Mandasa", "Palakonda", "Palasa", "Pathapatnam", "Polaki", "Ponduru", "Rajam", "Ranastalam", "Regidi Amadalavalasa", "Santhabommali", "Santhakaviti", "Saravakota", "Sarubujjili", "Seethampeta", "Sompeta", "Srikakulam", "Tekkali", "Vajrapu", "Vangara"],
    "Sri Sathya Sai": ["Agali", "Amadagur", "Amarapuram", "Bukkapatnam", "Dharmavaram", "Hindupur", "Kadiri", "Kothacheruvu", "Madakasira", "Mudigubba", "Nallamada", "Puttaparthi", "Roddam", "Tanakal"],
    "Tirupati": ["Chandragiri", "Chinnagottigallu", "Gudipala", "K.V.B. Puram", "Nagari", "Narayanavaram", "Nindra", "Pakala", "Renigunta", "S.R. Puram", "Sadum", "Tirupati (Rural)", "Tirupati (Urban)", "Vadamalapeta", "Vedurukuppam", "Vijayapuram", "Yerpedu"],
    "Visakhapatnam": ["Anandapuram", "Ananthagiri", "Araku Valley", "Bheemunipatnam", "Butchayyapeta", "Chintapalle", "Devarapalli", "Dumbriguda", "Gajuwaka", "Gangavaram", "Gopalapatnam", "Gudivada", "Hukumpeta", "K.Kotapadu", "Kasimkota", "Koyyuru", "Madugula", "Maharanipeta", "Mulagada", "Munagapaka", "Nakkapalli", "Nathavaram", "Padmanabham", "Pedagantyada", "Pendurthi", "Peda Bayalu", "Payakaraopeta", "Ravikamatham", "Rolugunta", "Sabbavaram", "Seethammadhara", "S. Rayavaram", "Visakhapatnam (Rural)", "Visakhapatnam (Urban)", "Yelamanchili"],
    "Vizianagaram": ["Badangi", "Balijipeta", "Bhogapuram", "Bobbili", "Cheepurupalli", "Denkada", "Gajapathinagaram", "Garividi", "Ghatikacharla", "Gurla", "Jami", "Kothavalasa", "Makkuva", "Mentada", "Merakamudidam", "Nellimarla", "Pachipenta", "Parvathipuram", "Pusapatirega", "Ramabhadrapuram", "Salur", "Seethanagaram", "Srungavarapukota", "Therlam", "Vepada", "Vizianagaram"],
    "West Godavari": ["Achanta", "Akiveedu", "Attili", "Bhimavaram", "Bhimadole", "Buttayagudem", "Chagallu", "Chintalapudi", "Devarapalli", "Dwaraka Tirumala", "Eluru", "Ganapavaram", "Gopalapuram", "Iragavaram", "Jangareddigudem", "Jeelugu Milli", "Kalla", "Kamavarapukota", "Kovvur", "Koyyalagudem", "Lingapalem", "Mogalthur", "Nallajerla", "Nidadavolu", "Palacole", "Palakol", "Pedapadu", "Pedavegi", "Pentapadu", "Penugonda", "Penumantra", "Peravali", "Poduru", "Polavaram", "Tadepalligudem", "Tanuku", "Undi", "Undrajavaram", "Unguturu", "Velerupadu", "Yelamanchili"],
    "YSR Kadapa": ["Badvel", "B.Kodur", "Brahmamgarimattam", "Chakrayapet", "Chennur", "Chinnamandem", "Duvvur", "Galiveedu", "Gopavaram", "Jammalamadugu", "Kalasapadu", "Kamalapuram", "Khajipet", "Kodur", "Kondapuram", "Lingala", "Lakkireddipalle", "Muddanur", "Mydukur", "Mylavaram", "Nandalur", "Obulavaripalle", "Peddamudium", "Pendlimarri", "Porumamilla", "Proddatur", "Pulivendla", "Rajampeta", "Ramapuram", "Rayachoti", "S. V. Kasinayan", "Sambepalle", "Sidhout", "Simhadripuram", "T. Sundupalle", "Vallur", "Veeraballe", "Vemula", "Vempalle", "Yerraguntla"],
    "Bangalore Urban": ["Anekal", "Bangalore South", "Bangalore North", "Yelahanka"],
    "Mysore": ["Mysore (Urban)", "Hunsur", "Krishnarajanagar", "Nanjangud"]
};
const cache = {};

let groundwaterData = [];

// Load groundwater data when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading groundwater data...');
    fetch('WQI-datasets/GroundWater2021.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            Papa.parse(data, {
                header: true,
                complete: function(results) {
                    groundwaterData = results.data
                        .filter(row => row['Station Code'] && row['pH Min'] && row['Conductivity (µmhos/cm) Min'])
                        .map(row => {
                            // Try to get coordinates from the station name
                            const stationName = row['Station Name'];
                            const coords = coordMap[stationName] || null;
                            
                            return {
                                stationCode: row['Station Code'],
                                stationName: row['Station Name'],
                                state: row['STATE'],
                                lat: coords ? coords.lat : null,
                                lon: coords ? coords.lon : null,
                                pH: (parseFloat(row['pH Min']) + parseFloat(row['pH Max'])) / 2,
                                conductivity: (parseFloat(row['Conductivity (µmhos/cm) Min']) + parseFloat(row['Conductivity (µmhos/cm) Max'])) / 2,
                                temp: (parseFloat(row['Temperature Min']) + parseFloat(row['Temperature Max'])) / 2
                            };
                        })
                        .filter(station => station.lat && station.lon); // Only keep stations with coordinates
                    
                    console.log('Groundwater data loaded successfully:', groundwaterData.length, 'stations');
                },
                error: function(error) {
                    console.error('Error parsing CSV:', error);
                }
            });
        })
        .catch(error => {
            console.error('Error loading groundwater data:', error);
        });
});

function getWQIData(location) {
    console.log('Getting WQI data for location:', location);
    
    // First try to get data from our location dataset
    if (locationData[location]) {
        console.log('Found location data in dataset');
        return {
            WQI: locationData[location].WQI,
            wqiStatus: locationData[location].wqiStatus,
            wqiData: locationData[location].wqiData
        };
    }

    // If not in dataset, try to find nearest station from groundwater data
    if (groundwaterData && groundwaterData.length > 0) {
        // Get coordinates for the location
        const coords = coordMap[location];
        if (coords) {
            const nearestStation = findNearestStation(coords);
            if (nearestStation) {
                const { WQI, status } = calculateWQI(
                    nearestStation.pH,
                    nearestStation.conductivity,
                    nearestStation.temp
                );
                
                return {
                    WQI: WQI,
                    wqiStatus: status,
                    wqiData: {
                        Temperature: nearestStation.temp,
                        pH: nearestStation.pH,
                        Conductivity: nearestStation.conductivity,
                        Turbidity: 5,
                        TDS: 500,
                        DO: 6,
                        BOD: 3,
                        Nutrients: 5
                    }
                };
            }
        }
    }

    // If all else fails, return default data
    console.log('Using default WQI data');
    return getDefaultWQIData();
}

function getDefaultWQIData() {
    return {
        WQI: 50,
        wqiStatus: 'Good',
        wqiData: {
            Temperature: 25,
            pH: 7,
            Conductivity: 500,
            Turbidity: 5,
            TDS: 500,
            DO: 6,
            BOD: 3,
            Nutrients: 5
        }
    };
}

function findNearestStation(coords) {
    if (!groundwaterData || groundwaterData.length === 0) {
        console.warn('Groundwater data not loaded yet');
        return null;
    }

    let nearestStation = null;
    let minDistance = Infinity;

    for (const station of groundwaterData) {
        // Calculate distance using Haversine formula
        const distance = calculateDistance(
            coords.lat,
            coords.lon,
            station.lat || 0,
            station.lon || 0
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearestStation = station;
        }
    }

    return nearestStation;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function toRad(degrees) {
    return degrees * (Math.PI/180);
}

function calculateWQI(pH, conductivity, temp) {
    console.log('Calculating WQI with parameters:', { pH, conductivity, temp });
    
    const pH_ideal = 7.0;
    const pH_standard = 8.5;
    const cond_ideal = 500;
    const cond_standard = 1500;
    const temp_ideal = 25;
    const temp_standard = 30;

    const qi_pH = (pH >= 6.5 && pH <= 8.5) ? 0 : 100 * Math.abs(pH - pH_ideal) / (pH_standard - pH_ideal);
    const qi_cond = 100 * Math.abs(conductivity - cond_ideal) / (cond_standard - cond_ideal);
    const qi_temp = 100 * Math.abs(temp - temp_ideal) / (temp_standard - temp_ideal);

    const w_pH = 0.375;
    const w_cond = 0.375;
    const w_temp = 0.25;

    const WQI = (qi_pH * w_pH) + (qi_cond * w_cond) + (qi_temp * w_temp);
    let status = '';
    if (WQI <= 25) status = 'Excellent';
    else if (WQI <= 50) status = 'Good';
    else if (WQI <= 75) status = 'Poor';
    else if (WQI <= 100) status = 'Very Poor';
    else status = 'Unsuitable';

    console.log('WQI calculation result:', { WQI, status });
    return { WQI: Number(WQI.toFixed(2)), status };
}

// Update the updateLocationDetails function to properly handle WQI data
async function updateLocationDetails(location, lat, lon, date, time) {
    console.log('[updateLocationDetails] Updating for:', location, lat, lon, date, time);
    try {
        // Get AQI data (pass location for fallback)
        const aqiData = await getAQIData(lat, lon, location);
        const status = aqiData.aqiStatus || getAQIStatus(aqiData.AQI);
        
        // Get WQI data
        const wqiData = getWQIData(location);
        console.log('WQI data:', wqiData);
        
        // Calculate Sustainability Index
        const siData = calculateSustainabilityIndex(aqiData.AQI, wqiData.WQI);
        
        // Update individual status cards
        const aqiValueElement = document.getElementById('aqiValue');
        const aqiStatusElement = document.getElementById('aqiStatus');
        const wqiValueElement = document.getElementById('wqiValue');
        const wqiStatusElement = document.getElementById('wqiStatus');
        const siValueElement = document.getElementById('siValue');
        const siStatusElement = document.getElementById('siStatus');

        if (aqiValueElement && aqiStatusElement) {
            aqiValueElement.textContent = aqiData.AQI;
            aqiValueElement.classList.remove('loading');
            aqiStatusElement.textContent = status;
            aqiStatusElement.classList.remove('loading');
            aqiStatusElement.className = `status-label ${status.toLowerCase().replace(/\s+/g, '-')}`;
            console.log('[updateLocationDetails] AQI updated:', aqiData.AQI, status);
        } else {
            console.warn('[updateLocationDetails] AQI DOM elements not found');
        }

        if (wqiValueElement && wqiStatusElement) {
            wqiValueElement.textContent = wqiData.WQI;
            wqiValueElement.classList.remove('loading');
            wqiStatusElement.textContent = wqiData.wqiStatus;
            wqiStatusElement.classList.remove('loading');
            wqiStatusElement.className = `status-label ${wqiData.wqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
        }

        if (siValueElement && siStatusElement) {
            siValueElement.textContent = siData.SI;
            siValueElement.classList.remove('loading');
            siStatusElement.textContent = siData.siStatus;
            siStatusElement.classList.remove('loading');
            siStatusElement.className = `status-label ${siData.siStatus.toLowerCase().replace(/\s+/g, '-')}`;
        }

        // Update suggestions
        updateSuggestions(aqiData.AQI, wqiData.WQI, siData.SI);

        // Update charts
        if (aqiData.pollutants) {
            renderAQIChart(aqiData.pollutants);
        }
        if (wqiData.wqiData) {
            renderWQIChart(wqiData.wqiData);
        }
    } catch (error) {
        console.error('[updateLocationDetails] Error:', error);
        // Always update DOM with fallback values
        const aqiValueElement = document.getElementById('aqiValue');
        const aqiStatusElement = document.getElementById('aqiStatus');
        if (aqiValueElement && aqiStatusElement) {
            aqiValueElement.textContent = '--';
            aqiValueElement.classList.remove('loading');
            aqiStatusElement.textContent = 'Unavailable';
            aqiStatusElement.classList.remove('loading');
            aqiStatusElement.className = 'status-label unavailable';
        }
    }
}

async function getCoordinates(location) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)},India&format=json&limit=1`, {
            headers: { 'User-Agent': 'AWQI-Environmental-Monitoring/1.0' }
        });
        if (!response.ok) {
            console.warn(`Geocoding failed for ${location}: ${response.statusText}`);
            return null;
        }
        const data = await response.json();
        if (data.length > 0) {
            const coords = { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
            console.log(`Geocoded ${location}:`, coords);
            return coords;
        }
        console.warn(`No geocoding results for ${location}`);
        return null;
    } catch (error) {
        console.error(`Geocoding error for ${location}:`, error.message);
        return null;
    }
}

// City-specific API keys
const cityAPIKeys = {
    'Mumbai': 'mumbai_api_key_1',
    'Delhi': 'delhi_api_key_2',
    'Bangalore': 'bangalore_api_key_3',
    'Hyderabad': 'hyderabad_api_key_4',
    'Chennai': 'chennai_api_key_5',
    'Kolkata': 'kolkata_api_key_6',
    'Pune': 'pune_api_key_7',
    'Ahmedabad': 'ahmedabad_api_key_8',
    'Jaipur': 'jaipur_api_key_9',
    'Lucknow': 'lucknow_api_key_10'
};

// Modified initCarousel function to include API calls
async function initCarousel() {
    const carousel = document.getElementById('cityCarousel');
    if (!carousel) {
        console.error('Carousel element not found');
        return;
    }

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';

    const popularCities = [
        'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 
        'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
        'Jaipur', 'Lucknow'
    ];

    // Create initial set of cards
    popularCities.forEach(city => {
        const card = createCityCard(city);
        carouselInner.appendChild(card);
    });

    // Clone first 5 cards and append them at the end for seamless scrolling
    for (let i = 0; i < 5; i++) {
        const clone = createCityCard(popularCities[i]);
        clone.setAttribute('aria-hidden', 'true'); // For accessibility
        clone.setAttribute('data-clone', 'true'); // Mark as clone for identification
        carouselInner.appendChild(clone);
    }

    carousel.innerHTML = ''; // Clear existing content
    carousel.appendChild(carouselInner);

    // Reset animation when it ends to create seamless loop
    carouselInner.addEventListener('animationend', () => {
        carouselInner.style.animation = 'none';
        carouselInner.offsetHeight; // Trigger reflow
        carouselInner.style.animation = null;
    });

    // Start updating AQI data for each city
    updateCarouselData();
}

// Helper function to create a city card
function createCityCard(city) {
            const card = document.createElement('div');
            card.className = 'city-card';
            card.innerHTML = `
        <strong>${city}</strong>
        <div class="aqi-indicator">
            <span class="aqi-value loading">Loading...</span>
            <span class="aqi-status"></span>
        </div>
    `;
    
    // Add click handler
            card.addEventListener('click', () => {
        const date = document.getElementById('dateInput').value;
        const time = document.getElementById('timeInput').value;
        updateLocation(city, date, time);
    });
    
    return card;
}

// Update carousel data with proper status display
async function updateCarouselData() {
    const cards = document.querySelectorAll('.city-card');
    
    for (const card of cards) {
        // Skip cloned cards to avoid duplicate API calls
        if (card.getAttribute('data-clone')) continue;

        const city = card.querySelector('strong').textContent;
        const aqiValue = card.querySelector('.aqi-value');
        const aqiStatus = card.querySelector('.aqi-status');
        
        try {
            let coords = coordMap[city];
            if (!coords) {
                coords = await getCoordinates(city);
                if (!coords) {
                    coords = getEstimatedCoordinates(city);
                }
                coordMap[city] = coords;
            }
            
            // Use city-specific API key
            const apiKey = cityAPIKeys[city] || API_KEY;
            const data = await getAQIData(coords.lat, coords.lon, city, apiKey);
            
            if (data && data.AQI) {
                // Update original card
                updateCardData(card, data);
                
                // Update cloned version of this card if it exists
                const clonedCards = document.querySelectorAll(`[data-clone="true"] strong`);
                clonedCards.forEach(clonedStrong => {
                    if (clonedStrong.textContent === city) {
                        updateCardData(clonedStrong.closest('.city-card'), data);
                    }
                });
            } else {
                setCardError(card, 'No data');
            }
        } catch (error) {
            console.error(`Error updating data for ${city}:`, error);
            setCardError(card, 'Error');
        }
    }
    
    // Update data every 5 minutes
    setTimeout(updateCarouselData, 300000);
}

// Helper function to update card data
function updateCardData(card, data) {
    const aqiValue = card.querySelector('.aqi-value');
    const aqiStatus = card.querySelector('.aqi-status');
    
    aqiValue.textContent = `AQI: ${data.AQI}`;
    aqiValue.className = `aqi-value aqi-status-${data.aqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
    aqiStatus.textContent = data.aqiStatus;
    aqiStatus.className = `aqi-status aqi-status-${data.aqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
}

// Helper function to set card error state
function setCardError(card, message) {
    const aqiValue = card.querySelector('.aqi-value');
    const aqiStatus = card.querySelector('.aqi-status');
    
    aqiValue.textContent = message;
    aqiValue.className = 'aqi-value';
    aqiStatus.textContent = '';
    aqiStatus.className = 'aqi-status';
}

function getEstimatedCoordinates(location) {
    const knownCoords = coordMap[location];
    if (knownCoords) {
        console.log(`Using mapped coords for ${location}:`, knownCoords);
        return knownCoords;
    }

    const district = Object.keys(districtAreas).find(d => districtAreas[d].includes(location));
    if (district && coordMap[district]) {
        console.log(`Using district coords for ${location} (district: ${district}):`, coordMap[district]);
        return coordMap[district];
    }

    const state = Object.keys(stateDistricts).find(s => stateDistricts[s].includes(location));
    if (state) {
        const stateCentroids = {
            'Andhra Pradesh': { lat: 15.9129, lon: 79.7400 },
        };
        const fallback = stateCentroids[state] || { lat: 28.7041, lon: 77.1025 };
        console.log(`Using state centroid for ${location} (state: ${state}):`, fallback);
        return fallback;
    }

    console.warn(`No coordinates for ${location}, defaulting to Delhi`);
    return { lat: 28.7041, lon: 77.1025 };
}

function calculateAQI(pollutants) {
    const subIndices = {
        pm2_5: getSubIndex(pollutants.pm2_5, 'pm2_5'),
        pm10: getSubIndex(pollutants.pm10, 'pm10'),
        o3: getSubIndex(pollutants.o3, 'o3'),
        no2: getSubIndex(pollutants.no2, 'no2'),
        so2: getSubIndex(pollutants.so2, 'so2'),
        co: getSubIndex(pollutants.co, 'co'),
        nh3: getSubIndex(pollutants.nh3, 'nh3')
    };

    // Return the highest sub-index as the AQI
    return Math.max(...Object.values(subIndices));
}

function getSubIndex(concentration, pollutant) {
    const breakpoints = {
        pm2_5: [0, 12, 35.4, 55.4, 150.4, 250.4, 350.4, 500.4],
        pm10: [0, 54, 154, 254, 354, 424, 504, 604],
        o3: [0, 54, 70, 85, 105, 200, 400, 500],
        no2: [0, 53, 100, 360, 649, 1249, 1649, 2049],
        so2: [0, 35, 75, 185, 304, 604, 804, 1004],
        co: [0, 4.4, 9.4, 12.4, 15.4, 30.4, 40.4, 50.4],
        nh3: [0, 200, 400, 800, 1200, 1800, 2400, 3000]
    };

    const aqiValues = [0, 50, 100, 150, 200, 300, 400, 500];
    const bp = breakpoints[pollutant];

    for (let i = 0; i < bp.length - 1; i++) {
        if (concentration >= bp[i] && concentration <= bp[i + 1]) {
            return Math.round(
                ((aqiValues[i + 1] - aqiValues[i]) / (bp[i + 1] - bp[i])) * 
                (concentration - bp[i]) + aqiValues[i]
            );
        }
    }

    return 500; // Return maximum AQI if concentration is above highest breakpoint
}

function getAQIStatus(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
}

// Modified getAQIData function to accept API key
async function getAQIData(lat, lon, location = null, apiKey = null) {
    try {
        // Use provided API key or fall back to default
        const key = apiKey || API_KEY;
        
        // Make API call with the specific key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        // Process the data and return AQI information
        const pollutants = {
            pm2_5: data.list[0].components.pm2_5,
            pm10: data.list[0].components.pm10,
            o3: data.list[0].components.o3,
            no2: data.list[0].components.no2,
            so2: data.list[0].components.so2,
            co: data.list[0].components.co,
            nh3: data.list[0].components.nh3
        };

        const aqi = calculateAQI(pollutants);
        const aqiStatus = getAQIStatus(aqi);

            return {
            AQI: aqi,
            aqiStatus: aqiStatus,
            pollutants: pollutants
            };
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        // Return fallback data if API call fails
        return locationData[location] || {
                AQI: 50,
                aqiStatus: 'Moderate',
                pollutants: {
                pm2_5: 30,
                pm10: 50,
                    o3: 30,
                    no2: 20,
                so2: 10,
                co: 0.8,
                nh3: 20
                }
            };
    }
}

// Helper function to find nearest city based on coordinates
function findNearestCity(lat, lon) {
    let nearestCity = 'Delhi';
    let minDistance = Infinity;

    for (const [city, coords] of Object.entries(coordMap)) {
        const distance = Math.sqrt(
            Math.pow(coords.lat - lat, 2) + 
            Math.pow(coords.lon - lon, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            nearestCity = city;
        }
    }
    return nearestCity;
}

function calculateSustainabilityIndex(aqi, wqi) {
    // Calculate SI based on AQI and WQI
    const si = Math.round((aqi + wqi) / 2);
    
    let siStatus;
    if (si >= 80) siStatus = 'Excellent';
    else if (si >= 60) siStatus = 'Good';
    else if (si >= 40) siStatus = 'Moderate';
    else siStatus = 'Poor';

    return {
        SI: si,
        siStatus: siStatus
    };
}

async function updateLocation(location, date, time) {
    if (!location) {
        console.error('No location provided');
        return;
    }

    try {
        // Show loading state
        showLoading(true, 'Updating location data...');
        
        // Get coordinates
        let coords = coordMap[location];
        if (!coords) {
            coords = await getCoordinates(location);
            if (!coords) {
                coords = getEstimatedCoordinates(location);
            }
            coordMap[location] = coords;
        }

        // Get AQI data
        const aqiData = await getAQIData(coords.lat, coords.lon, location);
        const calculatedAQI = aqiData.AQI;
        const aqiStatus = aqiData.aqiStatus || getAQIStatus(calculatedAQI);

        // Get WQI data
        const wqiData = getWQIData(location);

        // Calculate sustainability index
        const siData = calculateSustainabilityIndex(calculatedAQI, wqiData.WQI);

        // Update map if it exists
        if (window.map) {
            window.map.setView([coords.lat, coords.lon], 10);
            if (window.marker) {
                window.map.removeLayer(window.marker);
            }
            window.marker = L.circleMarker([coords.lat, coords.lon], {
                radius: 10,
                color: getAQIColor(calculatedAQI),
                fillColor: getAQIColor(calculatedAQI),
                fillOpacity: 0.7
            }).addTo(window.map).bindPopup(`<b>${location}</b><br>AQI: ${calculatedAQI} (${aqiStatus})`).openPopup();
        }

        // Update WQI status card
        const wqiValueElement = document.getElementById('wqiValue');
        const wqiStatusElement = document.getElementById('wqiStatus');
        if (wqiValueElement && wqiStatusElement) {
            wqiValueElement.textContent = wqiData.WQI;
            wqiValueElement.classList.remove('loading');
            wqiStatusElement.textContent = wqiData.wqiStatus;
            wqiStatusElement.classList.remove('loading');
            wqiStatusElement.className = `status-label ${wqiData.wqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
        }

        // Update SI status card
        const siValueElement = document.getElementById('siValue');
        const siStatusElement = document.getElementById('siStatus');
        if (siValueElement && siStatusElement) {
            siValueElement.textContent = siData.SI;
            siValueElement.classList.remove('loading');
            siStatusElement.textContent = siData.siStatus;
            siStatusElement.classList.remove('loading');
            siStatusElement.className = `status-label ${siData.siStatus.toLowerCase().replace(/\s+/g, '-')}`;
        }

        // Update recommendations
        updateSuggestions(calculatedAQI, wqiData.WQI, siData.SI);

        // Show success notification
        showNotification('Location updated successfully', 'success');

    } catch (error) {
        console.error('Error updating location:', error);
        showNotification('Failed to update location. Please try again.', 'error');
        
        // Use default values for the location
        const defaultData = locationData[location] || locationData['Puttaparthi'];
        
        // Update status cards with default values
        updateStatusCards(defaultData);
    } finally {
        showLoading(false);
    }
}

// Initialize map with proper AQI display
function initMap(location, coords, aqi) {
    if (window.map) window.map.remove();
    
    window.map = L.map('aqiMap').setView([coords.lat, coords.lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(window.map);

    // Add a marker for the initial location with AQI value
    const aqiStatus = getAQIStatus(aqi);
    window.marker = L.circleMarker([coords.lat, coords.lon], {
        radius: 10,
        color: getAQIColor(aqi),
        fillColor: getAQIColor(aqi),
        fillOpacity: 0.7
    }).addTo(window.map).bindPopup(`<b>${location}</b><br>AQI: ${aqi} (${aqiStatus})`).openPopup();

    // // Update AQI status card
    // const aqiValueElement = document.getElementById('aqiValue');
    // const aqiStatusElement = document.getElementById('aqiStatus');
    // if (aqiValueElement && aqiStatusElement) {
    //     aqiValueElement.textContent = aqi;
    //     aqiValueElement.classList.remove('loading');
    //     aqiStatusElement.textContent = aqiStatus;
    //     aqiStatusElement.classList.remove('loading');
    //     aqiStatusElement.className = `status-label ${aqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
    // }
}

async function startAPIServer() {
    globalThis.apiData = locationData;

    globalThis.getLocationData = (location) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(apiData[location] || { error: 'Location not found' }), 500);
        });
    };

    console.log('API server mock started. Access via getLocationData(location).');
}

// Simple location detection function
function getUserLocation() {
    console.log('Starting location detection...');
    
    // Show loading state
    document.getElementById('currentLocationName').textContent = 'Getting your location...';
    document.getElementById('currentLocationCoords').textContent = 'Please wait...';
    document.getElementById('currentLocationWQI').textContent = '--';
    document.getElementById('currentLocationWQIStatus').textContent = 'Loading...';
    document.getElementById('currentLocationSI').textContent = '--';
    document.getElementById('currentLocationSIStatus').textContent = 'Loading...';

    // Check if geolocation is supported
    if (!navigator.geolocation) {
        console.error('Geolocation is not supported');
        document.getElementById('currentLocationName').textContent = 'Geolocation not supported';
        document.getElementById('currentLocationCoords').textContent = 'Your browser does not support location detection';
        return;
    }

    // Simple geolocation request
    navigator.geolocation.getCurrentPosition(
        // Success callback
        function(position) {
            console.log('Location obtained:', position);
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Update coordinates display immediately
            document.getElementById('currentLocationCoords').textContent = 
                `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`;
            
            // Try to get location name from reverse geocoding first
            reverseGeocode(lat, lon).then(locationName => {
                if (locationName) {
                    document.getElementById('currentLocationName').textContent = locationName;
                    // Store the location name for later use
                    currentLocation = locationName;
                    
                    // Get WQI data for the location
                    const wqiData = getWQIData(locationName);
                    console.log('WQI data for current location:', wqiData);
                    
                    // Update WQI display
                    const wqiValue = document.getElementById('currentLocationWQI');
                    const wqiStatus = document.getElementById('currentLocationWQIStatus');
                    if (wqiValue && wqiStatus) {
                        wqiValue.textContent = `WQI: ${wqiData.WQI}`;
                        wqiStatus.textContent = wqiData.wqiStatus;
                        wqiStatus.className = `current-location-status ${wqiData.wqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
                    }
                }
            });

            // Get AQI data directly from OpenWeather API
            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch AQI data');
                    return response.json();
                })
                .then(data => {
                    if (data && data.list && data.list[0] && data.list[0].components) {
                        const components = data.list[0].components;
                        const calculatedAQI = calculateAQI({
                            pm2_5: components.pm2_5,
                            pm10: components.pm10,
                            o3: components.o3,
                            no2: components.no2,
                            so2: components.so2,
                            co: components.co,
                            nh3: components.nh3
                        });
                        
                        // Update AQI display
                        const aqiValue = document.getElementById('currentLocationAQI');
                        const aqiStatus = document.getElementById('currentLocationAQIStatus');
                        if (aqiValue && aqiStatus) {
                            aqiValue.textContent = `AQI: ${calculatedAQI}`;
                            const status = getAQIStatus(calculatedAQI);
                            aqiStatus.textContent = status;
                            aqiStatus.className = `current-location-status ${status.toLowerCase().replace(/\s+/g, '-')}`;
                        }

                        // Calculate and update SI
                        const wqiData = getWQIData(currentLocation);
                        const siData = calculateSustainabilityIndex(calculatedAQI, wqiData.WQI);
                        const siValue = document.getElementById('currentLocationSI');
                        const siStatus = document.getElementById('currentLocationSIStatus');
                        if (siValue && siStatus) {
                            siValue.textContent = `SI: ${siData.SI}`;
                            siStatus.textContent = siData.siStatus;
                            siStatus.className = `current-location-status ${siData.siStatus.toLowerCase().replace(/\s+/g, '-')}`;
                        }

                        // Update recommendations
                        updateSuggestions(calculatedAQI, wqiData.WQI, siData.SI);
                    }
                })
                .catch(error => {
                    console.error('Error fetching AQI data:', error);
                    // Fallback to local data
                    const nearestCity = findNearestCity(lat, lon);
                    const localData = locationData[nearestCity] || locationData['Delhi'];
                    
                    // Update AQI display with local data
                    const aqiValue = document.getElementById('currentLocationAQI');
                    const aqiStatus = document.getElementById('currentLocationAQIStatus');
                    if (aqiValue && aqiStatus) {
                        aqiValue.textContent = `AQI: ${localData.AQI}`;
                        aqiStatus.textContent = localData.aqiStatus;
                        aqiStatus.className = `current-location-status ${localData.aqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
                    }

                    // Update WQI display with local data
                    const wqiValue = document.getElementById('currentLocationWQI');
                    const wqiStatus = document.getElementById('currentLocationWQIStatus');
                    if (wqiValue && wqiStatus) {
                        wqiValue.textContent = `WQI: ${localData.WQI}`;
                        wqiStatus.textContent = localData.wqiStatus;
                        wqiStatus.className = `current-location-status ${localData.wqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
                    }

                    // Update SI display
                    const siData = calculateSustainabilityIndex(localData.AQI, localData.WQI);
                    const siValue = document.getElementById('currentLocationSI');
                    const siStatus = document.getElementById('currentLocationSIStatus');
                    if (siValue && siStatus) {
                        siValue.textContent = `SI: ${siData.SI}`;
                        siStatus.textContent = siData.siStatus;
                        siStatus.className = `current-location-status ${siData.siStatus.toLowerCase().replace(/\s+/g, '-')}`;
                    }

                    // Update recommendations with local data
                    updateSuggestions(localData.AQI, localData.WQI, siData.SI);
                });
        },
        // Error callback
        function(error) {
            console.error('Geolocation error:', error);
            let message = 'Location detection failed';
            let details = 'Please check your location permissions';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    message = 'Location access denied';
                    details = 'Please allow location access in your browser settings';
                    break;
                case error.POSITION_UNAVAILABLE:
                    message = 'Location unavailable';
                    details = 'Unable to determine your location';
                    break;
                case error.TIMEOUT:
                    message = 'Location request timed out';
                    details = 'Please try again';
                    break;
            }
            
            document.getElementById('currentLocationName').textContent = message;
            document.getElementById('currentLocationCoords').textContent = details;
            document.getElementById('currentLocationWQI').textContent = '--';
            document.getElementById('currentLocationWQIStatus').textContent = 'Unavailable';
            document.getElementById('currentLocationSI').textContent = '--';
            document.getElementById('currentLocationSIStatus').textContent = 'Unavailable';
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Update window.onload to be simpler
window.onload = function() {
    console.log('Page loaded, initializing...');
    
    // Initialize UI components
    startAPIServer();
    initCarousel();
    
    // Set current date and time
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].slice(0, 5);
    document.getElementById('dateInput').value = today;
    document.getElementById('timeInput').value = time;
    
    // Add a button to manually trigger location detection
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Get My Location';
    locationButton.className = 'location-button';
    locationButton.onclick = getUserLocation;
    
    const locationContainer = document.getElementById('currentLocationName').parentElement;
    locationContainer.appendChild(locationButton);
    
    // Try to get location automatically
    getUserLocation().catch(console.error);
};

function updateCurrentLocationUI(locationData, aqiData) {
    // Update location name
    const locationNameElement = document.getElementById('currentLocationName');
    if (locationNameElement) {
        locationNameElement.textContent = locationData.display_name || 'Current Location';
        locationNameElement.className = 'current-location-value';
    }

    // Update AQI value and status if available
    if (aqiData && aqiData.aqi_data) {
        const aqiValueElement = document.getElementById('currentLocationAQI');
        const aqiStatusElement = document.getElementById('currentLocationAQIStatus');
        
        if (aqiValueElement && aqiStatusElement) {
            aqiValueElement.textContent = aqiData.aqi_data.aqi || 'N/A';
            aqiValueElement.className = 'current-location-value';
            
            const status = aqiData.aqi_data.status || 'Unknown';
            aqiStatusElement.textContent = status;
            aqiStatusElement.className = 'current-location-status ' + status.toLowerCase();
        }
    }
}

function showCurrentLocationLoading() {
    const elements = [
        'currentLocationName',
        'currentLocationCoords',
        'currentLocationAQI',
        'currentLocationAQIStatus'
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = 'Loading...';
            element.className = element.className.replace('error', '') + ' loading';
        }
    });
}

async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
            headers: {
                'User-Agent': 'AWQI-Environmental-Monitoring/1.0'
            }
        });
        
        if (!response.ok) return null;
        
        const data = await response.json();
        return data.address.city || 
               data.address.town || 
               data.address.village || 
               data.address.suburb || 
               data.address.county || 
               data.address.state || 
               null;
    } catch (error) {
        console.warn('Reverse geocoding error:', error);
        return null;
    }
}

// Helper function to update location selectors
function updateLocationSelectors(location) {
    setTimeout(() => {
        const state = Object.keys(stateDistricts).find(s => 
            stateDistricts[s].some(d => 
                districtAreas[d]?.includes(location) || d === location
            )
        );

    if (state) {
            const stateSelect = document.getElementById('stateSelect');
            if (stateSelect) {
                stateSelect.value = state;
                stateSelect.dispatchEvent(new Event('change'));

                const district = Object.keys(districtAreas).find(d => 
                    districtAreas[d].includes(location) || d === location
                );

        if (district) {
                    const districtSelect = document.getElementById('districtSelect');
                    if (districtSelect) {
                        districtSelect.value = district;
                        districtSelect.dispatchEvent(new Event('change'));

                        if (districtAreas[district]?.includes(location)) {
                            const mandalSelect = document.getElementById('mandalSelect');
                            if (mandalSelect) {
                                mandalSelect.value = location;
                            }
                        }
                    }
                }
            }
        }
    }, 0);
}

// Update showLoading function to be more informative
function showLoading(show, message = 'Loading...') {
    const elements = [
        'locationInfo',
        'aqiValue',
        'wqiValue',
        'siValue',
        'aqiStatus',
        'wqiStatus',
        'siStatus',
        'suggestions-list'
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (show) {
                element.classList.add('loading');
                element.textContent = message;
            } else {
                element.classList.remove('loading');
            }
        }
    });

    // Disable form elements during loading
    const formElements = [
        'stateSelect',
        'districtSelect',
        'mandalSelect',
        'dateInput',
        'timeInput',
        'searchBtn'
    ];

    formElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.disabled = show;
        }
    });
}

function renderAQIChart(pollutants) {
    const ctx = document.getElementById('aqiChart');
    if (!ctx) return;

    const labels = Object.keys(pollutants);
    const values = Object.values(pollutants);
    const colors = values.map(value => getAQIColor(value));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pollutant Levels',
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Concentration (μg/m³)'
                    }
                }
            }
        }
    });
}

function renderWQIChart(wqiData) {
    const ctx = document.getElementById('wqiChart');
    if (!ctx) return;

    const labels = Object.keys(wqiData);
    const values = Object.values(wqiData);
    const colors = values.map(value => getWQIColor(value));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Water Quality Parameters',
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}

function getAQISuggestions(aqi) {
    const suggestions = [];
    
    if (aqi <= 50) {
        suggestions.push({
                text: 'Air quality is good. Enjoy outdoor activities.',
            priority: 'low',
            icon: 'smile'
        });
    } else if (aqi <= 100) {
        suggestions.push({
            text: 'Air quality is moderate. Sensitive groups should limit outdoor activities.',
            priority: 'medium',
            icon: 'exclamation-triangle'
        });
    } else if (aqi <= 150) {
        suggestions.push({
            text: 'Air quality is unhealthy for sensitive groups. Limit outdoor activities.',
            priority: 'high',
            icon: 'exclamation-circle'
        });
    } else {
        suggestions.push({
            text: 'Air quality is unhealthy. Avoid outdoor activities.',
            priority: 'critical',
            icon: 'times-circle'
        });
    }
    
    return suggestions;
}

function getWQISuggestions(wqi) {
    const suggestions = [];
    
    if (wqi >= 80) {
        suggestions.push({
                text: 'Water quality is excellent. Safe for all uses.',
            priority: 'low',
            icon: 'smile'
        });
    } else if (wqi >= 60) {
        suggestions.push({
            text: 'Water quality is good. Safe for most uses.',
            priority: 'medium',
            icon: 'exclamation-triangle'
        });
    } else if (wqi >= 40) {
        suggestions.push({
            text: 'Water quality is fair. Some treatment may be needed.',
            priority: 'high',
            icon: 'exclamation-circle'
        });
    } else {
        suggestions.push({
            text: 'Water quality is poor. Treatment required before use.',
            priority: 'critical',
            icon: 'times-circle'
        });
    }
    
    return suggestions;
}

function getSISuggestions(si) {
    const suggestions = [];
    
    if (si >= 80) {
        suggestions.push({
            text: 'Excellent sustainability. Continue current practices.',
            priority: 'low',
            icon: 'smile'
        });
    } else if (si >= 60) {
        suggestions.push({
            text: 'Good sustainability. Minor improvements possible.',
            priority: 'medium',
            icon: 'exclamation-triangle'
        });
    } else if (si >= 40) {
        suggestions.push({
            text: 'Fair sustainability. Significant improvements needed.',
            priority: 'high',
            icon: 'exclamation-circle'
        });
    } else {
        suggestions.push({
            text: 'Poor sustainability. Major changes required.',
            priority: 'critical',
            icon: 'times-circle'
        });
    }
    
    return suggestions;
}

function updateSuggestions(aqi, wqi, si) {
    console.log('Updating suggestions with:', { aqi, wqi, si });
    
    const suggestionsList = document.getElementById('suggestions-list');
    if (!suggestionsList) {
        console.error('Suggestions container not found');
        return;
    }

    // Get recommendations for each metric
    const aqiSuggestions = getAQISuggestions(aqi);
    const wqiSuggestions = getWQISuggestions(wqi);
    const siSuggestions = getSISuggestions(si);

    // Create HTML for recommendations
    let html = '';
    
    // AQI Recommendations
    html += `
        <div class="suggestion-card">
            <h4><i class="fas fa-wind"></i> Air Quality Recommendations</h4>
            <div class="suggestions-list">
                ${aqiSuggestions.map(s => `
                    <div class="suggestion-item ${s.priority}">
                        <i class="fas fa-${s.icon}"></i>
                        <span>${s.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // WQI Recommendations
    html += `
        <div class="suggestion-card">
            <h4><i class="fas fa-tint"></i> Water Quality Recommendations</h4>
            <div class="suggestions-list">
                ${wqiSuggestions.map(s => `
                    <div class="suggestion-item ${s.priority}">
                        <i class="fas fa-${s.icon}"></i>
                        <span>${s.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Sustainability Recommendations
    html += `
        <div class="suggestion-card">
            <h4><i class="fas fa-leaf"></i> Sustainability Recommendations</h4>
            <div class="suggestions-list">
                ${siSuggestions.map(s => `
                    <div class="suggestion-item ${s.priority}">
                        <i class="fas fa-${s.icon}"></i>
                        <span>${s.text}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Update the suggestions container
    suggestionsList.innerHTML = html;

    // Add CSS styles if they don't exist
    if (!document.getElementById('suggestions-styles')) {
        const style = document.createElement('style');
        style.id = 'suggestions-styles';
        style.textContent = `
            .suggestion-card {
                background: white;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .suggestion-card h4 {
                color: #333;
                margin-bottom: 10px;
                font-size: 1.1em;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .suggestions-list {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .suggestion-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px;
                border-radius: 4px;
                font-size: 0.9em;
            }
            .suggestion-item i {
                width: 20px;
                text-align: center;
            }
            .suggestion-item.low {
                background: #e6f4ea;
                color: #1e4620;
            }
            .suggestion-item.medium {
                background: #fff3e0;
                color: #e65100;
            }
            .suggestion-item.high {
                background: #fce4ec;
                color: #880e4f;
            }
            .suggestion-item.critical {
                background: #ffebee;
                color: #b71c1c;
            }
        `;
        document.head.appendChild(style);
    }
}

// Update the getAQISuggestions function to provide more detailed recommendations
function getAQISuggestions(aqi) {
    const suggestions = [];
    
    if (aqi <= 50) {
        suggestions.push({
            text: 'Air quality is good. Enjoy outdoor activities.',
            priority: 'low',
            icon: 'smile'
        });
        suggestions.push({
            text: 'Continue maintaining good air quality practices.',
            priority: 'low',
            icon: 'check-circle'
        });
    } else if (aqi <= 100) {
        suggestions.push({
            text: 'Air quality is moderate. Sensitive groups should limit outdoor activities.',
            priority: 'medium',
            icon: 'exclamation-triangle'
        });
        suggestions.push({
            text: 'Consider using air purifiers indoors.',
            priority: 'medium',
            icon: 'fan'
        });
    } else if (aqi <= 150) {
        suggestions.push({
            text: 'Air quality is unhealthy for sensitive groups. Limit outdoor activities.',
            priority: 'high',
            icon: 'exclamation-circle'
        });
        suggestions.push({
            text: 'Wear masks when going outside.',
            priority: 'high',
            icon: 'mask'
        });
    } else {
        suggestions.push({
            text: 'Air quality is unhealthy. Avoid outdoor activities.',
            priority: 'critical',
            icon: 'times-circle'
        });
        suggestions.push({
            text: 'Keep windows closed and use air purifiers.',
            priority: 'critical',
            icon: 'window-close'
        });
    }
    
    return suggestions;
}

// Update the getWQISuggestions function to provide more detailed recommendations
function getWQISuggestions(wqi) {
    const suggestions = [];
    
    if (wqi >= 80) {
        suggestions.push({
            text: 'Water quality is excellent. Safe for all uses.',
            priority: 'low',
            icon: 'smile'
        });
        suggestions.push({
            text: 'Continue maintaining good water quality practices.',
            priority: 'low',
            icon: 'check-circle'
        });
    } else if (wqi >= 60) {
        suggestions.push({
            text: 'Water quality is good. Safe for most uses.',
            priority: 'medium',
            icon: 'exclamation-triangle'
        });
        suggestions.push({
            text: 'Consider regular water quality monitoring.',
            priority: 'medium',
            icon: 'vial'
        });
    } else if (wqi >= 40) {
        suggestions.push({
            text: 'Water quality is fair. Some treatment may be needed.',
            priority: 'high',
            icon: 'exclamation-circle'
        });
        suggestions.push({
            text: 'Implement water treatment measures.',
            priority: 'high',
            icon: 'filter'
        });
    } else {
        suggestions.push({
            text: 'Water quality is poor. Treatment required before use.',
            priority: 'critical',
            icon: 'times-circle'
        });
        suggestions.push({
            text: 'Immediate water treatment and monitoring needed.',
            priority: 'critical',
            icon: 'water'
        });
    }
    
    return suggestions;
}

// Update the getSISuggestions function to provide more detailed recommendations
function getSISuggestions(si) {
    const suggestions = [];
    
    if (si >= 80) {
        suggestions.push({
            text: 'Excellent sustainability. Continue current practices.',
            priority: 'low',
            icon: 'smile'
        });
        suggestions.push({
            text: 'Share best practices with others.',
            priority: 'low',
            icon: 'share-alt'
        });
    } else if (si >= 60) {
        suggestions.push({
            text: 'Good sustainability. Minor improvements possible.',
            priority: 'medium',
            icon: 'exclamation-triangle'
        });
        suggestions.push({
            text: 'Consider implementing additional eco-friendly measures.',
            priority: 'medium',
            icon: 'leaf'
        });
    } else if (si >= 40) {
        suggestions.push({
            text: 'Fair sustainability. Significant improvements needed.',
            priority: 'high',
            icon: 'exclamation-circle'
        });
        suggestions.push({
            text: 'Develop and implement a sustainability action plan.',
            priority: 'high',
            icon: 'clipboard-list'
        });
    } else {
        suggestions.push({
            text: 'Poor sustainability. Major changes required.',
            priority: 'critical',
            icon: 'times-circle'
        });
        suggestions.push({
            text: 'Immediate action needed to improve environmental practices.',
            priority: 'critical',
            icon: 'exclamation'
        });
    }
    
    return suggestions;
}

function getAQIColor(aqi) {
    if (aqi <= 50) return '#4ade80'; // Bright green
    if (aqi <= 100) return '#fbbf24'; // Bright amber/yellow
    if (aqi <= 200) return '#f97316'; // Bright orange
    if (aqi <= 300) return '#ef4444'; // Bright red
    if (aqi <= 400) return '#9333ea'; // Bright purple
    return '#991b1b'; // Dark red for severe
}

function getWQIColor(wqi) {
    if (wqi >= 80) return '#4ade80'; // Bright green
    if (wqi >= 60) return '#fbbf24'; // Bright amber/yellow
    if (wqi >= 40) return '#f97316'; // Bright orange
    if (wqi >= 20) return '#ef4444'; // Bright red
    if (wqi >= 10) return '#9333ea'; // Bright purple
    return '#991b1b'; // Dark red for severe
}

document.getElementById('stateSelect').addEventListener('change', function() {
    const state = this.value;
    const districtSelect = document.getElementById('districtSelect');
    const mandalSelect = document.getElementById('mandalSelect');
    districtSelect.innerHTML = '<option value="">Select District</option>';
    mandalSelect.innerHTML = '<option value="">Select Mandal</option>';
    districtSelect.disabled = !state;
    mandalSelect.disabled = true;
    if (state && stateDistricts[state]) {
        stateDistricts[state].forEach(district => {
            districtSelect.innerHTML += `<option value="${district}">${district}</option>`;
        });
    }
});

document.getElementById('districtSelect').addEventListener('change', function() {
    const district = this.value;
    const mandalSelect = document.getElementById('mandalSelect');
    mandalSelect.innerHTML = '<option value="">Select Mandal</option>';
    mandalSelect.disabled = !district;
    if (district && districtAreas[district]) {
        districtAreas[district].forEach(mandal => {
            mandalSelect.innerHTML += `<option value="${mandal}">${mandal}</option>`;
        });
    }
});

document.getElementById('searchBtn').addEventListener('click', async () => {
    const state = document.getElementById('stateSelect').value;
    const district = document.getElementById('districtSelect').value;
    const mandal = document.getElementById('mandalSelect').value;
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;

    if (!date || !time) {
        alert('Please select both date and time.');
        return;
    }

    if (!state) {
        alert('Please select a state.');
        return;
    }

    const location = mandal || district || state;
    console.log(`Searching for: ${location}, Date: ${date}, Time: ${time}`);

    // Show loading state
    const aqiValueElement = document.getElementById('aqiValue');
    const aqiStatusElement = document.getElementById('aqiStatus');
    const wqiValueElement = document.getElementById('wqiValue');
    const wqiStatusElement = document.getElementById('wqiStatus');
    const siValueElement = document.getElementById('siValue');
    const siStatusElement = document.getElementById('siStatus');

    if (aqiValueElement && aqiStatusElement) {
        aqiValueElement.textContent = 'Loading...';
        aqiValueElement.classList.add('loading');
        aqiStatusElement.textContent = 'Loading...';
        aqiStatusElement.classList.add('loading');
    }

    document.getElementById('searchBtn').disabled = true;
    try {
        // Get coordinates for the location
        let coords = coordMap[location];
        if (!coords) {
            coords = await getCoordinates(location);
            if (!coords) {
                coords = getEstimatedCoordinates(location);
            }
        }

        let calculatedAQI;
        let aqiStatus;

        try {
            // Try to fetch AQI data from API
            const aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`);
            if (!aqiResponse.ok) throw new Error('Failed to fetch AQI data');
            const aqiData = await aqiResponse.json();
            
            // Calculate AQI from components
            const components = aqiData.list[0].components;
            calculatedAQI = calculateAQI({
                pm2_5: components.pm2_5,
                pm10: components.pm10,
                o3: components.o3,
                no2: components.no2,
                so2: components.so2,
                co: components.co,
                nh3: components.nh3
            });
        } catch (apiError) {
            console.warn('API fetch failed, using local data:', apiError);
            // Fallback to local data
            const nearestCity = findNearestCity(coords.lat, coords.lon);
            const localData = locationData[nearestCity] || locationData['Delhi'];
            calculatedAQI = localData.AQI;
        }

        // Get AQI status
        aqiStatus = getAQIStatus(calculatedAQI);

        // Get WQI data
        const wqiData = getWQIData(location);
        
        // Calculate SI
        const siData = calculateSustainabilityIndex(calculatedAQI, wqiData.WQI);

        // // Update all status cards
        // if (aqiValueElement && aqiStatusElement) {
        //     aqiValueElement.textContent = `AQI: ${calculatedAQI}`;
        //     aqiValueElement.classList.remove('loading');
        //     aqiStatusElement.textContent = aqiStatus;
        //     aqiStatusElement.classList.remove('loading');
        //     aqiStatusElement.className = `status-label ${aqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
        // }

        if (wqiValueElement && wqiStatusElement) {
            wqiValueElement.textContent = `WQI: ${wqiData.WQI}`;
            wqiValueElement.classList.remove('loading');
            wqiStatusElement.textContent = wqiData.wqiStatus;
            wqiStatusElement.classList.remove('loading');
            wqiStatusElement.className = `status-label ${wqiData.wqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
        }

        if (siValueElement && siStatusElement) {
            siValueElement.textContent = `SI: ${siData.SI}`;
            siValueElement.classList.remove('loading');
            siStatusElement.textContent = siData.siStatus;
            siStatusElement.classList.remove('loading');
            siStatusElement.className = `status-label ${siData.siStatus.toLowerCase().replace(/\s+/g, '-')}`;
        }

        // Update map if it exists
        if (window.map) {
            window.map.setView([coords.lat, coords.lon], 10);
            if (window.marker) {
                window.map.removeLayer(window.marker);
            }
            window.marker = L.circleMarker([coords.lat, coords.lon], {
                radius: 10,
                color: getAQIColor(calculatedAQI),
                fillColor: getAQIColor(calculatedAQI),
                fillOpacity: 0.7
            }).addTo(window.map).bindPopup(`<b>${location}</b><br>AQI: ${calculatedAQI}`).openPopup();
        }

        // Update other location details
        await updateLocation(location, date, time);
        
        // Update recommendations
        updateSuggestions(calculatedAQI, wqiData.WQI, siData.SI);
        
        // Show success notification
        showNotification('Location updated successfully', 'success');
    } catch (error) {
        console.error('Search error:', error);
        showNotification(`Unable to load data for ${location}. Using default values.`, 'error');
        
        // Use default values for Sri Sathya Sai
        const defaultData = locationData['Puttaparthi'];
        
        // Update all status cards with default values
        updateStatusCards({
            AQI: defaultData.AQI,
            WQI: defaultData.WQI,
            aqiStatus: defaultData.aqiStatus,
            wqiStatus: defaultData.wqiStatus
        });

        // Calculate and update SI
        const siData = calculateSustainabilityIndex(defaultData.AQI, defaultData.WQI);
        if (siValueElement && siStatusElement) {
            siValueElement.textContent = siData.SI;
            siValueElement.classList.remove('loading');
            siStatusElement.textContent = siData.status;
            siStatusElement.classList.remove('loading');
            siStatusElement.className = `status-label ${siData.status.toLowerCase().replace(/\s+/g, '-')}`;
        }
    } finally {
        document.getElementById('searchBtn').disabled = false;
    }
});

// Form validation
function validateForm() {
    const state = document.getElementById('stateSelect').value;
    const district = document.getElementById('districtSelect').value;
    const mandal = document.getElementById('mandalSelect').value;
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;

    let isValid = true;
    const errors = {
        state: '',
        district: '',
        date: '',
        time: ''
    };

    // Clear previous errors
    clearErrors();

    // State validation
    if (!state) {
        errors.state = 'Please select a state';
        isValid = false;
        showError('stateSelect', errors.state);
    }

    // District validation
    if (!district) {
        errors.district = 'Please select a district';
        isValid = false;
        showError('districtSelect', errors.district);
    }

    // Date validation
    if (!date) {
        errors.date = 'Please select a date';
        isValid = false;
        showError('dateInput', errors.date);
        } else {
        const selectedDate = new Date(date);
        const today = new Date();
        if (selectedDate > today) {
            errors.date = 'Date cannot be in the future';
            isValid = false;
            showError('dateInput', errors.date);
        }
    }

    // Time validation
    if (!time) {
        errors.time = 'Please select a time';
        isValid = false;
        showError('timeInput', errors.time);
    }

    return isValid;
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(`${elementId}Error`);
    element.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const elements = ['stateSelect', 'districtSelect', 'mandalSelect', 'dateInput', 'timeInput'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        const errorElement = document.getElementById(`${id}Error`);
        if (element) {
            element.classList.remove('error');
        }
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

// Enhanced UI feedback
function showNotification(message, type = 'info') {
    Swal.fire({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        text: message,
        icon: type,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });
}

// Enhanced location update
async function updateLocation(location, date, time) {
    if (!validateForm()) {
        return;
    }

    showLoading(true);
    
    try {
        let coords = coordMap[location];
        if (!coords) {
            coords = await getCoordinates(location);
            if (!coords) {
                coords = getEstimatedCoordinates(location);
            }
            coordMap[location] = coords;
        }

        await updateLocationDetails(location, coords.lat, coords.lon, date, time);
        showNotification('Location updated successfully', 'success');
    } catch (error) {
        console.error('Error updating location:', error);
        showNotification('Failed to update location. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Enhanced loading state
function showLoading(show) {
    const elements = [
        'locationInfo',
        'aqiValue',
        'wqiValue',
        'siValue',
        'aqiStatus',
        'wqiStatus',
        'siStatus',
        'suggestions-list'
    ];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (show) {
                element.classList.add('loading');
                element.textContent = 'Loading...';
            } else {
                element.classList.remove('loading');
            }
        }
    });

    // Disable form elements during loading
    const formElements = [
        'stateSelect',
        'districtSelect',
        'mandalSelect',
        'dateInput',
        'timeInput',
        'searchBtn'
    ];

    formElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.disabled = show;
        }
    });
}

// Enhanced chart rendering
function renderAQIChart(pollutants) {
    const ctx = document.getElementById('aqiChart');
    if (!ctx) return;

    const labels = Object.keys(pollutants);
    const values = Object.values(pollutants);
    const colors = values.map(value => getAQIColor(value));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
        datasets: [{
                label: 'Pollutant Levels',
                data: values,
                backgroundColor: colors,
                borderColor: colors,
            borderWidth: 1
        }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Concentration (μg/m³)'
                    }
                }
            }
        }
    });
}

// Enhanced WQI chart rendering
function renderWQIChart(wqiData) {
    const ctx = document.getElementById('wqiChart');
    if (!ctx) return;

    const labels = Object.keys(wqiData);
    const values = Object.values(wqiData);
    const colors = values.map(value => getWQIColor(value));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
        datasets: [{
                label: 'Water Quality Parameters',
                data: values,
                backgroundColor: colors,
                borderColor: colors,
            borderWidth: 1
        }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}

function getWQIUnit(parameter) {
    const units = {
        'Temperature': '°C',
        'Turbidity': 'NTU',
        'pH': '',
        'TDS': 'mg/L',
        'DO': 'mg/L',
        'BOD': 'mg/L',
        'Nutrients': 'mg/L'
    };
    return units[parameter] || '';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    const defaultLocation = 'Delhi';
    const defaultCoords = coordMap[defaultLocation];
    initMap(defaultLocation, defaultCoords, locationData[defaultLocation].AQI);

    // Initialize the carousel
    initCarousel();

    // State change handler
    document.getElementById('stateSelect').addEventListener('change', function(e) {
        const state = e.target.value;
        const districtSelect = document.getElementById('districtSelect');
        const mandalSelect = document.getElementById('mandalSelect');

        // Clear and disable mandal select
        mandalSelect.innerHTML = '<option value="">Select Mandal</option>';
        mandalSelect.disabled = true;

        if (state) {
            // Update districts
            districtSelect.innerHTML = '<option value="">Select District</option>';
            stateDistricts[state].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
            districtSelect.disabled = false;
        } else {
            districtSelect.innerHTML = '<option value="">Select District</option>';
            districtSelect.disabled = true;
        }

        clearErrors();
    });

    // District change handler
    document.getElementById('districtSelect').addEventListener('change', function(e) {
        const district = e.target.value;
        const mandalSelect = document.getElementById('mandalSelect');

        if (district && districtAreas[district]) {
            // Update mandals
            mandalSelect.innerHTML = '<option value="">Select Mandal</option>';
            districtAreas[district].forEach(mandal => {
                const option = document.createElement('option');
                option.value = mandal;
                option.textContent = mandal;
                mandalSelect.appendChild(option);
            });
            mandalSelect.disabled = false;
        } else {
            mandalSelect.innerHTML = '<option value="">Select Mandal</option>';
            mandalSelect.disabled = true;
        }

        clearErrors();
    });

    // Search button handler
    document.getElementById('searchBtn').addEventListener('click', async function() {
        const state = document.getElementById('stateSelect').value;
        const district = document.getElementById('districtSelect').value;
        const mandal = document.getElementById('mandalSelect').value;
        const date = document.getElementById('dateInput').value;
        const time = document.getElementById('timeInput').value;

        if (!date || !time) {
            alert('Please select both date and time.');
            return;
        }

        if (!state) {
            alert('Please select a state.');
            return;
        }

            const location = mandal || district || state;
        console.log(`Searching for: ${location}, Date: ${date}, Time: ${time}`);

        // Show loading state
        const aqiValueElement = document.getElementById('aqiValue');
        const aqiStatusElement = document.getElementById('aqiStatus');
        const wqiValueElement = document.getElementById('wqiValue');
        const wqiStatusElement = document.getElementById('wqiStatus');
        const siValueElement = document.getElementById('siValue');
        const siStatusElement = document.getElementById('siStatus');

        if (aqiValueElement && aqiStatusElement) {
            aqiValueElement.textContent = 'Loading...';
            aqiValueElement.classList.add('loading');
            aqiStatusElement.textContent = 'Loading...';
            aqiStatusElement.classList.add('loading');
        }

        document.getElementById('searchBtn').disabled = true;

        try {
            // Get coordinates
            let coords = coordMap[location];
            if (!coords) {
                coords = await getCoordinates(location);
                if (!coords) {
                    coords = getEstimatedCoordinates(location);
                }
            }

            // Get AQI data
            const aqiData = await getAQIData(coords.lat, coords.lon, location);
            const calculatedAQI = aqiData.AQI;
            const aqiStatus = aqiData.aqiStatus || getAQIStatus(calculatedAQI);

            // Get WQI data
            const wqiData = getWQIData(location);

            // Calculate sustainability index
            const siData = calculateSustainabilityIndex(calculatedAQI, wqiData.WQI);

            // Update all status cards
            if (aqiValueElement && aqiStatusElement) {
                aqiValueElement.textContent = calculatedAQI;
                aqiValueElement.classList.remove('loading');
                aqiStatusElement.textContent = aqiStatus;
                aqiStatusElement.classList.remove('loading');
                aqiStatusElement.className = `status-label ${aqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
            }

            if (wqiValueElement && wqiStatusElement) {
                wqiValueElement.textContent = wqiData.WQI;
                wqiValueElement.classList.remove('loading');
                wqiStatusElement.textContent = wqiData.wqiStatus;
                wqiStatusElement.classList.remove('loading');
                wqiStatusElement.className = `status-label ${wqiData.wqiStatus.toLowerCase().replace(/\s+/g, '-')}`;
            }

            if (siValueElement && siStatusElement) {
                siValueElement.textContent = siData.SI;
                siValueElement.classList.remove('loading');
                siStatusElement.textContent = siData.siStatus;
                siStatusElement.classList.remove('loading');
                siStatusElement.className = `status-label ${siData.siStatus.toLowerCase().replace(/\s+/g, '-')}`;
            }

            // Update map if it exists
            if (window.map) {
                window.map.setView([coords.lat, coords.lon], 10);
                if (window.marker) {
                    window.map.removeLayer(window.marker);
                }
                window.marker = L.circleMarker([coords.lat, coords.lon], {
                    radius: 10,
                    color: getAQIColor(calculatedAQI),
                    fillColor: getAQIColor(calculatedAQI),
                    fillOpacity: 0.7
                }).addTo(window.map).bindPopup(`<b>${location}</b><br>AQI: ${calculatedAQI}`).openPopup();
            }

            // Update recommendations
            updateSuggestions(calculatedAQI, wqiData.WQI, siData.SI);
            
            // Show success notification
            showNotification('Location updated successfully', 'success');
        } catch (error) {
            console.error('Search error:', error);
            showNotification(`Unable to load data for ${location}. Using default values.`, 'error');
            
            // Use default values for Sri Sathya Sai
            const defaultData = locationData['Puttaparthi'];
            
            // Update all status cards with default values
            updateStatusCards({
                AQI: defaultData.AQI,
                WQI: defaultData.WQI,
                aqiStatus: defaultData.aqiStatus,
                wqiStatus: defaultData.wqiStatus
            });

            // Calculate and update SI
            const siData = calculateSustainabilityIndex(defaultData.AQI, defaultData.WQI);
            if (siValueElement && siStatusElement) {
                siValueElement.textContent = siData.SI;
                siValueElement.classList.remove('loading');
                siStatusElement.textContent = siData.status;
                siStatusElement.classList.remove('loading');
                siStatusElement.className = `status-label ${siData.status.toLowerCase().replace(/\s+/g, '-')}`;
            }
        } finally {
            document.getElementById('searchBtn').disabled = false;
        }
    });

    // Set default date and time
    const now = new Date();
    document.getElementById('dateInput').value = now.toISOString().split('T')[0];
    document.getElementById('timeInput').value = now.toTimeString().split(' ')[0].slice(0, 5);

    // Try to get user's location
    getUserLocation().catch(console.error);
});

// Function to get historical AQI data with realistic trends
async function getHistoricalAQIData(location, days = 10) {
    const historicalData = [];
    const today = new Date();
    
    try {
        // Get current AQI data
        const coords = coordMap[location] || await getCoordinates(location);
        if (!coords) {
            throw new Error('Could not get coordinates for location');
        }
        
        const currentData = await getAQIData(coords.lat, coords.lon, location);
        const baseAQI = currentData.AQI;
        const basePollutants = currentData.pollutants;
        
        // Generate historical data with realistic variations
        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Calculate variation factor (more variation for older dates)
            const variationFactor = 1 + (Math.random() * 0.4 - 0.2) * (1 + i * 0.1);
            
            // Generate historical pollutants with realistic variations
            const historicalPollutants = {};
            Object.entries(basePollutants).forEach(([key, value]) => {
                // Add some randomness but keep it within realistic bounds
                const variation = 1 + (Math.random() * 0.3 - 0.15) * variationFactor;
                historicalPollutants[key] = Math.max(0, value * variation);
            });
            
            // Calculate historical AQI
            const historicalAQI = calculateAQI(historicalPollutants);
            
            historicalData.push({
                date: dateStr,
                aqi: Math.round(historicalAQI),
                pollutants: historicalPollutants
            });
        }
        
        // Sort data by date (newest first)
        historicalData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
    } catch (error) {
        console.error('Error generating historical AQI data:', error);
        // Fallback to local data with variations
        const fallbackData = locationData[location] || locationData['Puttaparthi'];
        
        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Generate variations for fallback data
            const variationFactor = 1 + (Math.random() * 0.4 - 0.2) * (1 + i * 0.1);
            const historicalPollutants = {};
            
            Object.entries(fallbackData.pollutants).forEach(([key, value]) => {
                const variation = 1 + (Math.random() * 0.3 - 0.15) * variationFactor;
                historicalPollutants[key] = Math.max(0, value * variation);
            });
            
            const historicalAQI = calculateAQI(historicalPollutants);
            
            historicalData.push({
                date: dateStr,
                aqi: Math.round(historicalAQI),
                pollutants: historicalPollutants
            });
        }
        
        // Sort data by date (newest first)
        historicalData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return historicalData;
}

// Function to render AQI trends chart
function renderAQITrendsChart(historicalData) {
    const ctx = document.getElementById('aqiTrendsChart');
    if (!ctx) return;

    // Prepare data for the chart
    const dates = historicalData.map(data => data.date);
    const aqiValues = historicalData.map(data => data.aqi);
    
    // Create gradient for the line
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(75, 192, 192, 0.2)');
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'AQI Trend',
                data: aqiValues,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: gradient,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'AQI Trend (Last 10 Days)'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `AQI: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'AQI Value'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

// Function to get historical WQI data
async function getHistoricalWQIData(location, days = 10) {
    const historicalData = [];
    const today = new Date();
    
    try {
        // Get current WQI data
        const currentData = getWQIData(location);
        const baseWQI = currentData.WQI;
        const baseParameters = currentData.wqiData;
        
        // Generate historical data with realistic variations
        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Calculate variation factor (more variation for older dates)
            const variationFactor = 1 + (Math.random() * 0.4 - 0.2) * (1 + i * 0.1);
            
            // Generate historical parameters with realistic variations
            const historicalParameters = {};
            Object.entries(baseParameters).forEach(([key, value]) => {
                // Add some randomness but keep it within realistic bounds
                const variation = 1 + (Math.random() * 0.3 - 0.15) * variationFactor;
                historicalParameters[key] = Math.max(0, value * variation);
            });
            
            historicalData.push({
                date: dateStr,
                wqi: Math.round(baseWQI * variationFactor),
                parameters: historicalParameters
            });
        }
        
        // Sort data by date (newest first)
        historicalData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
    } catch (error) {
        console.error('Error generating historical WQI data:', error);
        // Fallback to local data with variations
        const fallbackData = locationData[location] || locationData['Puttaparthi'];
        
        for (let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            
            // Generate variations for fallback data
            const variationFactor = 1 + (Math.random() * 0.4 - 0.2) * (1 + i * 0.1);
            const historicalParameters = {};
            
            Object.entries(fallbackData.wqiData).forEach(([key, value]) => {
                const variation = 1 + (Math.random() * 0.3 - 0.15) * variationFactor;
                historicalParameters[key] = Math.max(0, value * variation);
            });
            
            historicalData.push({
                date: dateStr,
                wqi: Math.round(fallbackData.WQI * variationFactor),
                parameters: historicalParameters
            });
        }
        
        // Sort data by date (newest first)
        historicalData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return historicalData;
}

// Function to render WQI trends line chart
function renderWQITrendsChart(historicalData) {
    const ctx = document.getElementById('wqiTrendsChart').getContext('2d');
    
    const data = {
        labels: historicalData.map(d => d.date),
        datasets: [{
            label: 'WQI',
            data: historicalData.map(d => d.wqi),
            borderColor: '#36A2EB',
            tension: 0.1
        }]
    };
    
    if (window.wqiTrendsChart) {
        window.wqiTrendsChart.destroy();
    }
    
    window.wqiTrendsChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'WQI Trends (Last 10 Days)'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to update historical data tables
function updateHistoricalDataTables(aqidata, wqidata) {
    console.log('Updating historical data tables:', { aqidata, wqidata });
    
    // Update AQI table
    const aqiTableBody = document.querySelector('#aqiTable tbody');
    if (aqiTableBody && aqidata && aqidata.length > 0) {
        aqiTableBody.innerHTML = '';
        aqidata.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.date}</td>
                <td>${data.pollutants.pm2_5?.toFixed(2) || 'N/A'}</td>
                <td>${data.pollutants.pm10?.toFixed(2) || 'N/A'}</td>
                <td>${data.pollutants.o3?.toFixed(2) || 'N/A'}</td>
                <td>${data.pollutants.no2?.toFixed(2) || 'N/A'}</td>
                <td>${data.pollutants.so2?.toFixed(2) || 'N/A'}</td>
                <td>${data.pollutants.co?.toFixed(2) || 'N/A'}</td>
                <td>${data.pollutants.nh3?.toFixed(2) || 'N/A'}</td>
                <td>${data.pollutants.Pb?.toFixed(2) || 'N/A'}</td>
            `;
            aqiTableBody.appendChild(row);
        });
    } else {
        console.warn('AQI table or data not available');
        if (aqiTableBody) {
            aqiTableBody.innerHTML = '<tr><td colspan="9">No historical AQI data available</td></tr>';
        }
    }

    // Update WQI table
    const wqiTableBody = document.querySelector('#wqiTable tbody');
    if (wqiTableBody && wqidata && wqidata.length > 0) {
        wqiTableBody.innerHTML = '';
        wqidata.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.date}</td>
                <td>${data.parameters.Temperature?.toFixed(2) || 'N/A'}</td>
                <td>${data.parameters.Turbidity?.toFixed(2) || 'N/A'}</td>
                <td>${data.parameters.pH?.toFixed(2) || 'N/A'}</td>
                <td>${data.parameters.TDS?.toFixed(2) || 'N/A'}</td>
                <td>${data.parameters.DO?.toFixed(2) || 'N/A'}</td>
                <td>${data.parameters.BOD?.toFixed(2) || 'N/A'}</td>
                <td>${data.parameters.Nutrients?.toFixed(2) || 'N/A'}</td>
            `;
            wqiTableBody.appendChild(row);
        });
    } else {
        console.warn('WQI table or data not available');
        if (wqiTableBody) {
            wqiTableBody.innerHTML = '<tr><td colspan="8">No historical WQI data available</td></tr>';
        }
    }
}

// Update the updateLocation function to include historical data
async function updateLocation(location, date, time) {
    try {
        // Get current data
        const coords = await getCoordinates(location);
        const aqiData = await getAQIData(coords.lat, coords.lon, location);
        const wqiData = getWQIData(location);
        
        // Get historical data
        const historicalAQIData = await getHistoricalAQIData(location);
        const historicalWQIData = await getHistoricalWQIData(location);
        
        // Update current data displays
        updateLocationDetails(location, coords.lat, coords.lon, date, time);
        
        // Update composition charts
        renderAQICompositionChart(aqiData.pollutants);
        renderWQICompositionChart(wqiData.wqiData);
        
        // Update trends charts
        renderAQITrendsChart(historicalAQIData);
        renderWQITrendsChart(historicalWQIData);
        
        // Update historical data tables
        updateHistoricalDataTables(historicalAQIData, historicalWQIData);
        
        showNotification('Location data updated successfully', 'success');
    } catch (error) {
        console.error('Error updating location:', error);
        showNotification('Failed to update location data', 'error');
    }
}

