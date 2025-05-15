let currentLocation = 'Delhi';
let carouselIndex = 0;
const suggestions = document.getElementById('suggestions-list');

const API_KEY = '0c286e13d68a43f9f57092b05b610fc6'; 
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

function initCarousel() {
    const carousel = document.getElementById('cityCarousel');
    carousel.innerHTML = ''; // Clear existing cards

    // Get locations from locationData
    const locations = Object.keys(locationData);

    // Create cards for each location (duplicate for seamless looping)
    const createCards = () => {
        locations.forEach((location, index) => {
            const card = document.createElement('div');
            card.className = 'city-card';
            const aqi = locationData[location].AQI || 'N/A';
            const wqi = locationData[location].WQI || 'N/A';
            card.innerHTML = `
                <strong>${location}</strong><br>
                AQI: ${aqi}<br>
                WQI: ${wqi}
            `;
            card.addEventListener('click', () => {
                const today = new Date().toISOString().split('T')[0];
                const time = new Date().toTimeString().split(' ')[0].slice(0, 5);
                updateLocation(location, today, time);
            });
            carousel.appendChild(card);
        });
    };

    // Create two sets of cards for seamless looping
    createCards();
    createCards(); // Duplicate for continuous effect

    // Adjust animation duration based on number of cards
    const totalCards = locations.length * 2;
    const cardWidth = 160; // Width of each card (150px + 10px margin)
    carousel.style.width = `${totalCards * cardWidth}px`;
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
    // Convert co from µg/m³ to mg/m³ for EPA breakpoints
    const coMgM3 = pollutants.co / 1000;

    // Breakpoints for each pollutant (EPA standards, µg/m³ except co in mg/m³)
    const breakpoints = {
        pm2_5: [
            { C_low: 0.0, C_high: 12.0, I_low: 0, I_high: 50 },
            { C_low: 12.1, C_high: 35.4, I_low: 51, I_high: 100 },
            { C_low: 35.5, C_high: 55.4, I_low: 101, I_high: 150 },
            { C_low: 55.5, C_high: 150.4, I_low: 151, I_high: 200 },
            { C_low: 150.5, C_high: 250.4, I_low: 201, I_high: 300 },
            { C_low: 250.5, C_high: 350.4, I_low: 301, I_high: 400 },
            { C_low: 350.5, C_high: 500.4, I_low: 401, I_high: 500 }
        ],
        pm10: [
            { C_low: 0, C_high: 54, I_low: 0, I_high: 50 },
            { C_low: 55, C_high: 154, I_low: 51, I_high: 100 },
            { C_low: 155, C_high: 254, I_low: 101, I_high: 150 },
            { C_low: 255, C_high: 354, I_low: 151, I_high: 200 },
            { C_low: 355, C_high: 424, I_low: 201, I_high: 300 },
            { C_low: 425, C_high: 504, I_low: 301, I_high: 400 },
            { C_low: 505, C_high: 604, I_low: 401, I_high: 500 }
        ],
        o3: [
            { C_low: 0, C_high: 54, I_low: 0, I_high: 50 }, // 8-hour avg
            { C_low: 55, C_high: 70, I_low: 51, I_high: 100 },
            { C_low: 71, C_high: 85, I_low: 101, I_high: 150 },
            { C_low: 86, C_high: 105, I_low: 151, I_high: 200 },
            { C_low: 106, C_high: 200, I_low: 201, I_high: 300 }
        ],
        co: [
            { C_low: 0.0, C_high: 4.4, I_low: 0, I_high: 50 }, // mg/m³
            { C_low: 4.5, C_high: 9.4, I_low: 51, I_high: 100 },
            { C_low: 9.5, C_high: 12.4, I_low: 101, I_high: 150 },
            { C_low: 12.5, C_high: 15.4, I_low: 151, I_high: 200 },
            { C_low: 15.5, C_high: 30.4, I_low: 201, I_high: 300 },
            { C_low: 30.5, C_high: 40.4, I_low: 301, I_high: 400 },
            { C_low: 40.5, C_high: 50.4, I_low: 401, I_high: 500 }
        ],
        so2: [
            { C_low: 0, C_high: 35, I_low: 0, I_high: 50 }, // 1-hour avg
            { C_low: 36, C_high: 75, I_low: 51, I_high: 100 },
            { C_low: 76, C_high: 185, I_low: 101, I_high: 150 },
            { C_low: 186, C_high: 304, I_low: 151, I_high: 200 }
        ],
        no2: [
            { C_low: 0, C_high: 53, I_low: 0, I_high: 50 }, // 1-hour avg
            { C_low: 54, C_high: 100, I_low: 51, I_high: 100 },
            { C_low: 101, C_high: 360, I_low: 101, I_high: 150 },
            { C_low: 361, C_high: 649, I_low: 151, I_high: 200 },
            { C_low: 650, C_high: 1249, I_low: 201, I_high: 300 },
            { C_low: 1250, C_high: 1649, I_low: 301, I_high: 400 },
            { C_low: 1650, C_high: 2049, I_low: 401, I_high: 500 }
        ]
    };

    // Function to calculate sub-index for a pollutant
    function getSubIndex(concentration, pollutant) {
        const bp = breakpoints[pollutant];
        for (let i = 0; i < bp.length; i++) {
            if (concentration >= bp[i].C_low && concentration <= bp[i].C_high) {
                const I = ((bp[i].I_high - bp[i].I_low) / (bp[i].C_high - bp[i].C_low)) * (concentration - bp[i].C_low) + bp[i].I_low;
                return Math.round(I);
            }
        }
        // If concentration exceeds highest breakpoint, use the highest AQI
        return bp[bp.length - 1].I_high;
    }

    // Calculate sub-indices
    const subIndices = {
        pm2_5: getSubIndex(pollutants.pm2_5, 'pm2_5'),
        pm10: getSubIndex(pollutants.pm10, 'pm10'),
        o3: getSubIndex(pollutants.o3, 'o3'),
        co: getSubIndex(coMgM3, 'co'),
        so2: getSubIndex(pollutants.so2, 'so2'),
        no2: getSubIndex(pollutants.no2, 'no2')
    };

    // AQI is the maximum sub-index
    const aqi = Math.max(...Object.values(subIndices));
    const dominantPollutant = Object.keys(subIndices).reduce((a, b) => subIndices[a] > subIndices[b] ? a : b);

    // AQI categories
    const aqiStatus = aqi <= 50 ? 'Good' :
                     aqi <= 100 ? 'Moderate' :
                     aqi <= 150 ? 'Unhealthy for Sensitive Groups' :
                     aqi <= 200 ? 'Unhealthy' :
                     aqi <= 300 ? 'Very Unhealthy' :
                     aqi <= 400 ? 'Hazardous' :
                     'Severe';

    return {
        AQI: aqi,
        aqiStatus: aqiStatus,
        subIndices: subIndices,
        dominantPollutant: dominantPollutant
    };
}

async function getAQIData(lat, lon) {
    const cacheKey = `${lat}_${lon}_${Math.floor(Date.now() / (60 * 60 * 1000))}`;
    if (cache[cacheKey]) return cache[cacheKey];

    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        if (!response.ok) throw new Error(`AQI API error: ${response.statusText}`);
        const data = await response.json();
        console.log("lat", data);
        const calculatedAQI = calculateAQI(data.list[0].components);
        const aqiData = {
            AQI:calculatedAQI.AQI , // Adjust based on API response
            aqiStatus : calculateAQI.aqiStatus,
            pollutants: data.list[0].components
        };
        cache[cacheKey] = aqiData;
        return aqiData;
    } catch (error) {
        console.error(`AQI fetch error for lat=${lat}, lon=${lon}:`, error.message);
        return { AQI: 50, aqiStatus: 'Good', pollutants: { pm2_5: 20, pm10: 30, o3: 20, no2: 15, so2: 10, co: 5, nh3: 10, Pb: 0 } };
    }
}

function getAQIStatus(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 200) return 'Poor';
    if (aqi <= 300) return 'Very Poor';
    return 'Severe';
}

function getWQIData(location) {
    const data = locationData[location] || {
        WQI: 50,
        wqiStatus: 'Good',
        wqiData: { Temperature: 25, Turbidity: 2, pH: 7, TDS: 300, DO: 6, BOD: 3, Nutrients: 5 }
    };
    console.log(`WQI for ${location}:`, data);
    return data;
}

function calculateSustainabilityIndex(aqi, wqi) {
    const normalizedAQI = Math.max(0, 100 - (aqi / 5));
    const normalizedWQI = Math.max(0, 100 - wqi);
    const si = 0.5 * normalizedAQI + 0.5 * normalizedWQI;
    let siStatus;
    if (si >= 80) siStatus = 'Excellent';
    else if (si >= 60) siStatus = 'Good';
    else if (si >= 40) siStatus = 'Moderate';
    else if (si >= 20) siStatus = 'Poor';
    else siStatus = 'Critical';
    const result = { SI: Math.round(si), siStatus };
    console.log(`Sustainability Index:`, result);
    return result;
}



function updateLocationDetails(location, lat, lon, date, time) {
    const info = `
        <span>Place: ${location}</span> | 
        <span>Latitude: ${lat.toFixed(4)}</span> | 
        <span>Longitude: ${lon.toFixed(4)}</span> | 
        <span>Date: ${date}</span> | 
        <span>Time: ${time}</span>
    `;
    document.getElementById('locationInfo').innerHTML = info;
}

async function updateLocation(location, date, time) {
    console.log(`Updating: ${location}, ${date}, ${time}`);
    showLoading(true);
    try {
        currentLocation = location;
        const coords = await getCoordinates(location) || getEstimatedCoordinates(location);
        if (!coords.lat || !coords.lon) throw new Error(`Invalid coordinates for ${location}`);

        const aqiData = await getAQIData(coords.lat, coords.lon);
        const wqiData =await getWQIData(location);
        const siData =await calculateSustainabilityIndex(aqiData.AQI, wqiData.WQI);

        document.getElementById('aqiValue').textContent = aqiData.AQI;
        document.getElementById('aqiStatus').textContent = aqiData.aqiStatus;
        document.getElementById('wqiValue').textContent = wqiData.WQI;
        document.getElementById('wqiStatus').textContent = wqiData.wqiStatus;
        document.getElementById('siValue').textContent = siData.SI;
        document.getElementById('siStatus').textContent = siData.siStatus;

        renderAQIChart(aqiData.pollutants);
        renderWQIChart(wqiData.wqiData);
        updateAQITable(location, date);
        updateWQITable(location, date);
        updateSuggestions(aqiData.AQI, wqiData.WQI, siData.SI);
        initMap(location, coords, aqiData.AQI);
        updateLocationDetails(location, coords.lat, coords.lon, date, time); // New call
    } catch (error) {
        console.error(`Update error for ${location}:`, error.message);
        throw new Error(error.message);
    } finally {
        showLoading(false);
    }
}

// Enhanced WQI Calculation (using dataset parameters)
function calculateWQI(location) {
    const data = locationData[location] || {
        wqiData: { Temperature: 25, Turbidity: 2, pH: 7, TDS: 300, DO: 6, BOD: 3, Nutrients: 5 }
    };
    const { Temperature, Turbidity, pH, TDS, DO, BOD, Nutrients } = data.wqiData;

    // Weighted WQI formula based on typical water quality criteria
    const weights = { Temperature: 0.15, Turbidity: 0.15, pH: 0.20, TDS: 0.15, DO: 0.15, BOD: 0.10, Nutrients: 0.10 };
    const qi = {
        Temperature: (Temperature > 30 ? 100 - (Temperature - 30) * 5 : 100) * weights.Temperature,
        Turbidity: (Turbidity > 5 ? 100 - (Turbidity - 5) * 20 : 100) * weights.Turbidity,
        pH: (Math.abs(7 - pH) > 1 ? 100 - (Math.abs(7 - pH) * 50) : 100) * weights.pH,
        TDS: (TDS > 500 ? 100 - (TDS - 500) / 5 : 100) * weights.TDS,
        DO: (DO < 5 ? DO * 20 : 100) * weights.DO,
        BOD: (BOD > 5 ? 100 - BOD * 20 : 100) * weights.BOD,
        Nutrients: (Nutrients > 10 ? 100 - Nutrients * 10 : 100) * weights.Nutrients
    };

    const wqi = Object.values(qi).reduce((sum, value) => sum + value, 0);
    const wqiStatus = wqi >= 80 ? 'Excellent' : wqi >= 60 ? 'Good' : wqi >= 40 ? 'Moderate' : wqi >= 20 ? 'Poor' : 'Critical';
    return { WQI: Math.round(wqi), wqiStatus, wqiData: data.wqiData };
}

// Update getWQIData to use calculated WQI
function getWQIData(location) {
    const calculatedWQI = calculateWQI(location);
    console.log(`Calculated WQI for ${location}:`, calculatedWQI);
    return calculatedWQI;
}

// Enhanced Sustainability Index with dataset alignment
function calculateSustainabilityIndex(aqi, wqi) {
    const normalizedAQI = Math.max(0, 100 - (aqi / 5));
    const normalizedWQI = Math.max(0, wqi); // Using calculated WQI directly
    const si = 0.5 * normalizedAQI + 0.5 * normalizedWQI;
    let siStatus;
    if (si >= 80) siStatus = 'Excellent';
    else if (si >= 60) siStatus = 'Good';
    else if (si >= 40) siStatus = 'Moderate';
    else if (si >= 20) siStatus = 'Poor';
    else siStatus = 'Critical';
    return { SI: Math.round(si), siStatus };
}

async function updateLocation(location, date, time) {
    console.log(`Updating: ${location}, ${date}, ${time}`);
    showLoading(true);
    try {
        currentLocation = location || 'Unknown'; 
        let coords;

        if (typeof location === 'string' && coordMap[location]) {
            coords = coordMap[location];
        }
        else if (typeof location === 'string' && location.includes('Lat:') && location.includes('Lon:')) {
            const latPart = location.split(',')[0].split(':')[1].trim();
            const lonPart = location.split(',')[1].split(':')[1].trim();
            coords = { lat: parseFloat(latPart), lon: parseFloat(lonPart) };
        }
        else {
            coords = await getCoordinates(location) || getEstimatedCoordinates(location);
        }

        if (!coords.lat || !coords.lon) throw new Error(`Invalid coordinates for ${currentLocation}`);

        const aqiData = await getAQIData(coords.lat, coords.lon);
        const wqiData = getWQIData(currentLocation); 
        const siData = calculateSustainabilityIndex(aqiData.AQI, wqiData.WQI);

        document.getElementById('aqiValue').textContent = aqiData.AQI;
        document.getElementById('aqiStatus').textContent = aqiData.aqiStatus;
        document.getElementById('wqiValue').textContent = wqiData.WQI;
        document.getElementById('wqiStatus').textContent = wqiData.wqiStatus;
        document.getElementById('siValue').textContent = siData.SI;
        document.getElementById('siStatus').textContent = siData.siStatus;

        renderAQIChart(aqiData.pollutants);
        renderWQIChart(wqiData.wqiData);
        updateAQITable(currentLocation, date);
        updateWQITable(currentLocation, date);
        updateSuggestions(aqiData.AQI, wqiData.WQI, siData.SI);
        initMap(currentLocation, coords, aqiData.AQI); 
        updateLocationDetails(currentLocation, coords.lat, coords.lon, date, time);
    } catch (error) {
        console.error(`Update error for ${currentLocation}:`, error.message);
        throw new Error(error.message);
    } finally {
        showLoading(false);
    }
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

window.onload = async () => {
    await startAPIServer();
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].slice(0, 5);
    document.getElementById('dateInput').value = today;
    document.getElementById('timeInput').value = time;

    const userLoc = await getUserLocation();
    const initialLocation = userLoc?.location || 'Delhi';
    if (userLoc) {
        coordMap[initialLocation] = { lat: userLoc.lat, lon: userLoc.lon };
    }
    updateLocation(initialLocation, today, time);

    const state = Object.keys(stateDistricts).find(s => stateDistricts[s].some(d => districtAreas[d]?.includes(initialLocation) || d === initialLocation));
    if (state) {
        document.getElementById('stateSelect').value = state;
        document.getElementById('stateSelect').dispatchEvent(new Event('change'));
        const district = Object.keys(districtAreas).find(d => districtAreas[d].includes(initialLocation) || d === initialLocation);
        if (district) {
            document.getElementById('districtSelect').value = district;
            document.getElementById('districtSelect').dispatchEvent(new Event('change'));
            if (districtAreas[district]?.includes(initialLocation)) {
                document.getElementById('mandalSelect').value = initialLocation;
            }
        }
    }
};


function renderAQIChart(pollutants) {
    const ctx = document.getElementById('aqiChart').getContext('2d');
    if (window.aqiChart && typeof window.aqiChart.destroy === 'function') {
        window.aqiChart.destroy();
    }
    window.aqiChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['PM2.5', 'pm10', 'o3', 'no2', 'so2', 'co', 'nh3'],
            datasets: [{
                data: [pollutants.pm2_5, pollutants.pm10, pollutants.o3, pollutants.no2, pollutants.so2, pollutants.co, pollutants.nh3],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function renderWQIChart(wqiData) {
    const ctx = document.getElementById('wqiChart').getContext('2d');
    if (window.wqiChart && typeof window.wqiChart.destroy === 'function') {
        window.wqiChart.destroy();
    }
    window.wqiChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Temperature', 'Turbidity', 'pH', 'TDS', 'DO', 'BOD', 'Nutrients'],
            datasets: [{
                data: [wqiData.Temperature, wqiData.Turbidity, wqiData.pH, wqiData.TDS, wqiData.DO, wqiData.BOD, wqiData.Nutrients],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

function updateSuggestions(aqi, wqi, si) {
    let messages = [];

    // AQI Suggestions
    if (aqi <= 50) {
        messages.push('Air Quality: Good - Enjoy outdoor activities safely!');
    } else if (aqi <= 100) {
        messages.push('Air Quality: Satisfactory - Minor discomfort possible for sensitive groups.');
    } else if (aqi <= 200) {
        messages.push('Air Quality: Moderate - Wear a mask if sensitive to pollution.');
        messages.push('Limit prolonged outdoor exertion.');
    } else if (aqi <= 300) {
        messages.push('Air Quality: Poor - Avoid outdoor activities.');
        messages.push('Use air purifiers indoors.');
    } else if (aqi <= 400) {
        messages.push('Air Quality: Very Poor - Stay indoors, seal windows.');
        messages.push('Seek medical advice if breathing issues arise.');
    } else {
        messages.push('Air Quality: Severe - Critical health risk! Avoid exposure.');
    }

    // WQI Suggestions
    if (wqi <= 25) {
        messages.push('Water Quality: Excellent - Safe for all uses.');
    } else if (wqi <= 50) {
        messages.push('Water Quality: Good - Suitable for drinking and use.');
    } else if (wqi <= 75) {
        messages.push('Water Quality: Poor - Boil or filter water before drinking.');
        messages.push('Check TDS levels regularly.');
    } else if (wqi <= 100) {
        messages.push('Water Quality: Very Poor - Use bottled water if possible.');
        messages.push('Avoid using for cooking without treatment.');
    } else {
        messages.push('Water Quality: Unsuitable - Unsafe for any use.');
    }

    // SI Suggestions
    if (si >= 80) {
        messages.push('Sustainability: Excellent - Keep up eco-friendly practices!');
    } else if (si >= 60) {
        messages.push('Sustainability: Good - Maintain current efforts.');
        messages.push('Consider reducing pollution sources.');
    } else if (si >= 40) {
        messages.push('Sustainability: Moderate - Adopt greener habits.');
        messages.push('Monitor air and water quality closely.');
    } else if (si >= 20) {
        messages.push('Sustainability: Poor - Take action to improve environment.');
        messages.push('Reduce waste and emissions.');
    } else {
        messages.push('Sustainability: Critical - Urgent action needed!');
    }
    console.log(messages.join('\n'))

    suggestions.innerText = messages.join('\n');
}

function updateAQITable(location, date) {
    const table = document.getElementById('aqiTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    const baseDate = new Date(date);
    for (let i = 0; i < 10; i++) {
        const pastDate = new Date(baseDate.getTime() - i * 86400000);
        const dateStr = pastDate.toLocaleDateString();
        const row = table.insertRow();
        row.innerHTML = `<td>${dateStr}</td><td>${Math.floor(Math.random() * 100)}</td><td>${Math.floor(Math.random() * 150)}</td><td>${Math.floor(Math.random() * 80)}</td><td>${Math.floor(Math.random() * 50)}</td><td>${Math.floor(Math.random() * 30)}</td><td>${Math.floor(Math.random() * 20)}</td><td>${Math.floor(Math.random() * 40)}</td><td>${(Math.random() * 0.5).toFixed(2)}</td>`;
    }
}

function updateWQITable(location, date) {
    const table = document.getElementById('wqiTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    const baseDate = new Date(date);
    for (let i = 0; i < 10; i++) {
        const pastDate = new Date(baseDate.getTime() - i * 86400000);
        const dateStr = pastDate.toLocaleDateString();
        const row = table.insertRow();
        row.innerHTML = `<td>${dateStr}</td><td>${(Math.random() * 10 + 20).toFixed(1)}</td><td>${(Math.random() * 5).toFixed(1)}</td><td>${(Math.random() * 2 + 6).toFixed(1)}</td><td>${(Math.random() * 500 + 200).toFixed(0)}</td><td>${(Math.random() * 4 + 4).toFixed(1)}</td><td>${(Math.random() * 10).toFixed(1)}</td><td>${(Math.random() * 20).toFixed(1)}</td>`;
    }
}

function initMap(location, coords, aqi) {
    if (window.map) window.map.remove(); 
    window.map = L.map('aqiMap').setView([coords.lat, coords.lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(window.map);

    // Add a marker for the initial location
    L.circleMarker([coords.lat, coords.lon], {
        radius: 10,
        color: getAQIColor(aqi),
        fillColor: getAQIColor(aqi),
        fillOpacity: 0.7
    }).addTo(window.map).bindPopup(`<b>${location}</b><br>AQI: ${aqi}`).openPopup();

    window.map.on('click', async function(e) {
        const { lat, lng } = e.latlng;
        
        showLoading(true);
    
        try {
            const clickedLocation = await reverseGeocode(lat, lng);
            currentLocation = clickedLocation || `Lat: ${lat.toFixed(4)}, Lon: ${lng.toFixed(4)}`; 
    
            if (window.marker) window.map.removeLayer(window.marker);
            window.marker = L.circleMarker([lat, lng], {
                radius: 10,
                color: 'blue',
                fillColor: 'blue',
                fillOpacity: 0.7
            }).addTo(window.map).bindPopup(`<b>${currentLocation}</b>`).openPopup();
    
            const today = new Date().toISOString().split('T')[0];
            const time = new Date().toTimeString().split(' ')[0].slice(0, 5);
            await updateLocation(currentLocation, today, time);
    
            const state = Object.keys(stateDistricts).find(s => stateDistricts[s].some(d => districtAreas[d]?.includes(currentLocation) || d === currentLocation));
            if (state) {
                document.getElementById('stateSelect').value = state;
                document.getElementById('stateSelect').dispatchEvent(new Event('change'));
                const district = Object.keys(districtAreas).find(d => districtAreas[d].includes(currentLocation) || d === currentLocation);
                if (district) {
                    document.getElementById('districtSelect').value = district;
                    document.getElementById('districtSelect').dispatchEvent(new Event('change'));
                    if (districtAreas[district]?.includes(currentLocation)) {
                        document.getElementById('mandalSelect').value = currentLocation;
                    }
                }
            }
        } catch (error) {
            console.error('Map click error:', error.message);
            alert(`Failed to process clicked location: ${error.message}`);
        } finally {
            showLoading(false);
        }
    });
}

function getAQIColor(aqi) {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 200) return 'orange';
    if (aqi <= 300) return 'red';
    if (aqi <= 400) return 'purple';
    return 'maroon';
}

function showLoading(show) {
    const suggestions = document.getElementsByClassName('suggestions')[0];
    suggestions.classList.toggle('loading', show);
    suggestions.textContent = show ? 'Loading data...' : '';
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

    document.getElementById('searchBtn').disabled = true;
    try {
        await updateLocation(location, date, time);
    } catch (error) {
        alert(`Failed to load data for ${location}: ${error.message}`);
        console.error('Search error:', error);
    } finally {
        document.getElementById('searchBtn').disabled = false;
    }
});

async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log(`User location: lat=${latitude}, lon=${longitude}`);
                    const location = await reverseGeocode(latitude, longitude);
                    resolve({ lat: latitude, lon: longitude, location });
                },
                (error) => {
                    console.error('Geolocation error:', error.message);
                    resolve(null);  
                }
            );
        } else {
            console.warn('Geolocation not supported');
            resolve(null);
        }
    });
}

async function reverseGeocode(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
            headers: { 'User-Agent': 'AWQI-Environmental-Monitoring/1.0' }
        });
        if (!response.ok) throw new Error(`Reverse geocoding failed: ${response.statusText}`);
        const data = await response.json();
        const location = data.address.city || data.address.town || data.address.village || data.address.county || 'Unknown';
        console.log(`Reverse geocoded to: ${location} at lat=${lat}, lon=${lon}`);
        return location;
    } catch (error) {
        console.error('Reverse geocoding error:', error.message);
        return null;  
    }
}

window.onload = async () => {
    await startAPIServer();
    initCarousel(); 
    const today = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0].slice(0, 5);
    document.getElementById('dateInput').value = today;
    document.getElementById('timeInput').value = time;

    const userLoc = await getUserLocation();
    const initialLocation = userLoc?.location || 'Delhi';
    if (userLoc) {
        coordMap[initialLocation] = { lat: userLoc.lat, lon: userLoc.lon };
    }
    updateLocation(initialLocation, today, time);

    const state = Object.keys(stateDistricts).find(s => stateDistricts[s].some(d => districtAreas[d]?.includes(initialLocation) || d === initialLocation));
    if (state) {
        document.getElementById('stateSelect').value = state;
        document.getElementById('stateSelect').dispatchEvent(new Event('change'));
        const district = Object.keys(districtAreas).find(d => districtAreas[d].includes(initialLocation) || d === initialLocation);
        if (district) {
            document.getElementById('districtSelect').value = district;
            document.getElementById('districtSelect').dispatchEvent(new Event('change'));
            if (districtAreas[district]?.includes(initialLocation)) {
                document.getElementById('mandalSelect').value = initialLocation;
            }
        }
    }
};