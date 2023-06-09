const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { dialog } = require('electron');
const { error } = require('console');
const smalltalk = require('smalltalk');

function scrollToTop() {
	window.scrollTo({
	  top: 0,
	  behavior: 'smooth'
	});
  }
 
  function scrollToBottom() {
	window.scrollTo({
	  top: document.body.scrollHeight,
	  behavior: 'smooth'
	});
  }

  window.addEventListener('scroll', function() {
	var scrollToTopBtn = document.getElementById('scrollToTopBtn');
	var scrollToBottomBtn = document.getElementById('scrollToBottomBtn');
	
	if (window.scrollY > 200) {
	  scrollToTopBtn.classList.add('active');
	  scrollToBottomBtn.classList.add('active');
	} else {
	  scrollToTopBtn.classList.remove('active');
	  scrollToBottomBtn.classList.remove('active');
	}
  });

function addnew() { 
	var table = document.getElementById("captable");
	if (table) {
	  var tbody = table.getElementsByTagName('tbody')[0];
	  var row = tbody.insertRow(-1);
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);
	  var cell5 = row.insertCell(4);
	  var cell6 = row.insertCell(5);
	  var cell7 = row.insertCell(6);
	  var cell8 = row.insertCell(7);
	  var cell9 = row.insertCell(8);
	  var cell10 = row.insertCell(9);
	  var cell11 = row.insertCell(10);
	  var rowCount = tbody.rows.length;
	  cell1.innerHTML = `<input type='text' class='nowidth' id='No${rowCount}' value="${rowCount}" disabled>`;
	  cell2.innerHTML = `<input type='text' class='nhmwidth' id='nhm${rowCount}'>`;
	  cell3.innerHTML = `<input type='text' class='rthwidth' id='rth${rowCount}'>`;
	  cell4.innerHTML = `<input type='text' class='agewidth' id='age${rowCount}'>`;
	  cell5.innerHTML = `<input type='text' class='sexwidth' id='sex${rowCount}'>`;
	  cell6.innerHTML = `<input type='text' class='bdwidth' id='bday${rowCount}'>`;
	  cell7.innerHTML = `<input type='text' class='cswidth' id='cs${rowCount}'>`;
	  cell8.innerHTML = `<input type='text' class='occwidth' id='occ${rowCount}'>`;
	  cell9.innerHTML = `<input type='text' class='oswidth' id='os${rowCount}'>`;
	  cell10.innerHTML = `<input type='text' class='heawidth' id='hea${rowCount}'>`;
	  cell11.innerHTML = `<input type='text' class='relwidth' id='rel${rowCount}'>`;
	}
  }
  


function deleteit(){
    var table = document.getElementById("captable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function btnbtn() {
	var head = document.getElementById('head').value.replace(/\s+/g, '_');
	var numfam = document.getElementById('numfam').value;
	var address = document.getElementById('address').value;
	var length = document.getElementById('length').value;
	var ethnic = document.getElementById('ethnic').value;
	var famtype = document.getElementById('famtype').value;
	var primdia = document.getElementById('primdia').value;
	var lanare = document.getElementById('lanare').value;
	var north = document.getElementById('north').value;
	var west = document.getElementById('west').value;
	var east = document.getElementById('east').value;
	var south = document.getElementById('south').value;
	var nscb = document.getElementById('nscb').value;
	var dslbh = document.getElementById('dslbh').value;
	var dbtp = document.getElementById('dbtp').value;
	var dbnh = document.getElementById('dbnh').value;
	var faci = document.getElementById('faci').value;
	var trans = document.getElementById('trans').value;
	var natres = document.getElementById('natres').value;
	
	var db = new sqlite3.Database(path.join(__dirname, `Databases/${head}.db`));
	db.run(
	  `CREATE TABLE IF NOT EXISTS "${head}_info" (
		Family_Head TEXT,
		No_of_Family_Member TEXT,
		Complete_Address TEXT,
		Length_of_Residency TEXT,
		Ethnic_Group TEXT,
		Type_of_Family TEXT,
		Primary_Dialect TEXT
	  )`,
	  function (err) {
		if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_info already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_info already exists`,
				buttons: ['OK']
			  });
		} else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		} else {
		  db.run(`INSERT INTO "${head}_info" VALUES (?, ?, ?, ?, ?, ?, ?)`, 
		  [head, numfam, address, length, ethnic, famtype, primdia], function (err) {
			if (err) {
				dialog.showMessageBox({
					type: 'warning',
					message: err,
					buttons: ['OK']
				  });
			} else {
			  console.log('success');
			}
		  });
		}
	  }
	);
  

  db.run(
	`CREATE TABLE IF NOT EXISTS "${head}_PhysicalGeographical_Data" (
	  Land_Area TEXT,
	  Boundary_North TEXT,
	  Boundary_West TEXT,
	  Boundary_East TEXT,
	  Boundary_South TEXT,
	  Sitios_Composing_Barangay TEXT,
	  Sitio_Distance_From_Landmark TEXT,
	  Sitio_Distance_From_Town_Proper TEXT,
	  Sitio_Distance_From_National_Highway TEXT,
	  Facilities TEXT,
	  Transportation TEXT,
	  Natural_Resources TEXT
	)`,
	function (err) {
		if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_PhysicalGeographical_Data already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_PhysicalGeographical_Data already exists`,
				buttons: ['OK']
			  });
		} else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		} else {
		  db.run(`INSERT INTO "${head}_PhysicalGeographical_Data" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
		  [lanare, north, west, east, south, nscb, dslbh, dbtp, dbnh, faci, trans, natres], function (err) {
			if (err) {
				dialog.showMessageBox({
					type: 'warning',
					message: err,
					buttons: ['OK']
				  });
			} else {
			  console.log('success');
			}
		  });
		}
	  }
	);
	
	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Family_Structure" (
		  No TEXT,
		  Name_of_Household_Member TEXT,
		  Relation_to_Head TEXT,
		  Age TEXT,
		  Sex TEXT,
		  Birth_Date TEXT,
		  Civil_Status TEXT,
		  Occupation TEXT,
		  Occupational_Status TEXT,
		  Highest_Educational_Attainment TEXT,
		  Religion TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Family_Structure already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Community_As_A_People already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			var table = document.getElementById('captable');
			if (!table) {
				dialog.showMessageBox({
					type: 'warning',
					message: `table not found`,
					buttons: ['OK']
				  });
			  return;
			}
			var table = document.getElementById("captable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var nhm = document.getElementById("nhm"+`${i}`).value;
				var rth = document.getElementById("rth"+`${i}`).value;
				var age = document.getElementById("age"+`${i}`).value;
				var sex = document.getElementById("sex"+`${i}`).value;
				var bday = document.getElementById("bday"+`${i}`).value;
				var cs = document.getElementById("cs"+`${i}`).value;
				var occ = document.getElementById("occ"+`${i}`).value;
				var os = document.getElementById("os"+`${i}`).value;
				var hea = document.getElementById("hea"+`${i}`).value;
				var rel = document.getElementById("rel"+`${i}`).value;
				
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Family_Structure" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
					[i, nhm, rth, age, sex, bday, cs, occ, os, hea, rel], function (err) {
					  if (err) {
						dialog.showMessageBox({
							type: 'warning',
							message: err,
							buttons: ['OK']
						  });
						reject(err);
					  } else {
						console.log('success');
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("All data inserted successfully");
				})
				.catch(function(err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				});
			}
		  }
		}
	);
	
	var a1 = document.getElementsByName('A.1');
	var a2 = document.getElementsByName('A.2');
	var a21 = document.getElementsByName('A.2.1');
	var a3 = document.getElementsByName('A.3');
	var a4food = document.getElementById('food').value;
	var a4health = document.getElementById('health').value;
	var a4houserent = document.getElementById('houserent').value;
	var a4education = document.getElementById('education').value;
	var a4electric = document.getElementById('electricbill').value;
	var a4clothing = document.getElementById('clothing').value;
	var a4waterbill = document.getElementById('waterbill').value;
	var a4others = document.getElementById('a4others').value;
	var a5 = document.getElementsByName('A.5');
	var a51 = document.getElementsByName('A.5.1');
	var b1 = document.querySelectorAll('input[type="checkbox"][name="B.1"]');
	var b2 = document.querySelectorAll('input[type="checkbox"][name="B.2"]');
	var b3 = document.querySelectorAll('input[type="checkbox"][name="B.3"]');
	var b4 = document.querySelectorAll('input[type="checkbox"][name="B.4"]');
	var c1 = document.getElementsByName('C.1');
	var c2 = document.getElementsByName('C.2');
	var c3 = document.getElementsByName('C.3');
	var c4 = document.getElementsByName('C.4');
	var c5 = document.getElementsByName('C.5');
	var c6 = document.getElementsByName('C.6');
	var c71 = document.getElementsByName('C.7.1');
	var c7 = document.querySelectorAll('input[type="checkbox"][name="C.7"]');
	var c8 = document.getElementsByName('C.8');
	var c81 = document.getElementsByName('C.8.1');
	var c9 = document.getElementsByName('C.9');
	var c91 = document.getElementsByName('C.9.1');
	var c92 = document.getElementsByName('C.9.2');
	var c93 = document.querySelectorAll('input[type="checkbox"][name="C.9.3"]');
	var c10 = document.querySelectorAll('input[type="checkbox"][name="C.10"]');
	var c101 = document.getElementsByName('C.10.1');
	var c102 = document.getElementsByName('C.10.2');
	var c103 = document.getElementsByName('C.10.3');
	var c12 = document.getElementsByName('C.12');
	var c13 = document.querySelectorAll('input[type="checkbox"][name="C.13"]');
	var c131 = document.querySelectorAll('input[type="checkbox"][name="C.13.1"]');
	var A1 = "";
	var A2 = "";
	var A3 = "";
	var A4 = `${a4food} food,
			  ${a4health} health,
			  ${a4houserent} house rent,
			  ${a4education} education,
			  ${a4electric} electric bill,
			  ${a4clothing} clothing,
			  ${a4waterbill} waterbill,
			  ${a4others}`;
	var A5 = "";
	var B1 = "";
	var B2 = "";
	var B3 = "";
	var B4 = "";
	var C1 = "";
	var C2 = "";
	var C3 = "";
	var C4 = "";
	var C5 = "";
	var C6 = "";
	var C7 = "";
	var C7level = "";
	var C8 = "";
	var C8condition = "";
	var C9segregation = "";
	var C9used = "";
	var C9container = "";
	var C9method = "";
	var C10toilet = "";
	var C10level = "";
	var C10ownership = "";
	var C10sanitary = "";
	var C12 = "";
	var C13 = "";
	var C131 = "";

	for(var i = 0; i < a1.length; i++){
		if(a1[i].checked){
			A1 += a1[i].value;
		}
	}

	for(var i = 0; i < a2.length; i++){
		if(a2[i].checked){
		if(a2[i].value == "Yes"){
			for(var b = 0; b < a21.length; b++){
				if(a21[b].checked){
					if(a21[b].value != "others"){
						A2 += a21[b].value;
					}
					else if(a21[b].value == "others"){
						var others = document.getElementById('others').value;
						A2 += others;
					}
				}
			}
		}
			else if(a2[i].value == "No"){
				A2 += a2[i].value;
			}
		}
	}

	for(var i = 0; i < a3.length; i++){
		if(a3[i].checked){
			A3 += a3[i].value;
		}
	}

	for(var i = 0; i < a5.length; i++){
		if(a5[i].checked){
		if(a5[i].value == "Yes"){
			for(var b = 0; b < a51.length; b++){
				if(a51[b].checked){
					if(a51[b].value != "others"){
						A5 += a51[b].value;
					}
					else if(a51[b].value == "others"){
						var others = document.getElementById('a5others').value;
						A5 += others;
					}
				}
			}
		}
			else if(a5[i].value == "No"){
				A5 += a5[i].value;
			}
		}
	}

	for(var i = 0; i < b1.length; i++){
		if(b1[i].checked){
			if(b1[i].value != "others"){
			B1 += b1[i].value + " ";
		} 
		if(b1[i].value == "others"){
			var others = document.getElementById('b1others').value;
			B1 += b1[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < b2.length; i++){
		if(b2[i].checked){
			if(b2[i].value != "others"){
			B2 += b2[i].value + " ";
		} 
		if(b2[i].value == "others"){
			var others = document.getElementById('b2others').value;
			B2 += b2[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < b3.length; i++){
		if(b3[i].checked){
			if(b3[i].value != "others"){
			B3 += b3[i].value + " ";
		} 
		if(b3[i].value == "others"){
			var others = document.getElementById('b3others').value;
			B3 += b3[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < b4.length; i++){
		if(b4[i].checked){
			if(b4[i].value != "others"){
			B4 += b4[i].value + " ";
		} 
		if(b4[i].value == "others"){
			var others = document.getElementById('b4others').value;
			B4 += b4[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c1.length; i++){
		if(c1[i].checked){
			C1 += c1[i].value;
		}
	}

	for(var i = 0; i < c2.length; i++){
		if(c2[i].checked){
			C2 += c2[i].value;
		}
	}

	for(var i = 0; i < c3.length; i++){
		if(c3[i].checked){
			C3 += c3[i].value;
		}
	}

	for(var i = 0; i < c4.length; i++){
		if(c4[i].checked){
			C4 += c4[i].value;
		}
	}

	for(var i = 0; i < c5.length; i++){
		if(c5[i].checked){
			C5 += c5[i].value;
		}
	}

	for(var i = 0; i < c6.length; i++){
		if(c6[i].checked){
			if(c6[i].value != "others"){
			C6 += c6[i].value + " ";
		} 
		if(c6[i].value == "others"){
			var others = document.getElementById('c6others').value;
			C6 += c6[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c7.length; i++){
		if(c7[i].checked){
			if(c7[i].value != "others"){
			C7 += c7[i].value + " ";
		} 
		if(c7[i].value == "others"){
			var others = document.getElementById('c7others').value;
			C7 += c7[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c71.length; i++){
		if(c71[i].checked){
			C7level += c71[i].value;
		}
	}

	for(var i = 0; i < c8.length; i++){
		if(c8[i].checked){
			C8 += c8[i].value;
		}
	}

	for(var i = 0; i < c81.length; i++){
		if(c81[i].checked){
			C8condition += c81[i].value;
		}
	}

	for(var i = 0; i < c9.length; i++){
		if(c9[i].checked){
			C9segregation += c9[i].value;
		}
	}

	for(var i = 0; i < c91.length; i++){
		if(c91[i].checked){
			C9used += c91[i].value;
		}
	}

	for(var i = 0; i < c92.length; i++){
		if(c92[i].checked){
			C9container += c92[i].value;
		}
	}

	for(var i = 0; i < c93.length; i++){
		if(c93[i].checked){
			if(c93[i].value != "others"){
			C9method += c93[i].value + " ";
		} 
		if(c93[i].value == "others"){
			var others = document.getElementById('c9others').value;
			C9method += c93[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c10.length; i++){
		if(c10[i].checked){
			if(c10[i].value != "others"){
			C10toilet += c10[i].value + " ";
		} 
		if(c10[i].value == "others"){
			var others = document.getElementById('c10others').value;
			C10toilet += c10[i].value + " " + others;
		}
		}
	}

	for(var i = 0; i < c101.length; i++){
		if(c101[i].checked){
			C10level += c101[i].value;
		}
	}

	for(var i = 0; i < c102.length; i++){
		if(c102[i].checked){
			C10ownership += c102[i].value;
		}
	}

	var C10distance = document.getElementById('c10distance').value;

	for(var i = 0; i < c103.length; i++){
		if(c103[i].checked){
			C10sanitary += c103[i].value;
		}
	}

	for(var i = 0; i < c12.length; i++){
		if(c12[i].checked){
			if(c12[i].value == "specify"){
				var specify = document.getElementById('c12specify').value;
				C12 += specify;
			} else if(c12[i].value == "None"){
				C12 += "None";
			}
		}
	}

	for(var i = 0; i < c13.length; i++){
		if(c13[i].checked){
			if(c13[i].value == "others"){
				var others = document.getElementById('c13others').value;
				C13 +=  c13[i].value + " " + others;
			} else if(c13[i].value != "others"){
				C13 += c13[i].value + " ";
			}
		}
	}

	for(var i = 0; i < c131.length; i++){
		if(c131[i].checked){
			if(c131[i].value == "others"){
				var others = document.getElementById('c131others').value;
				C131 += c131[i].value + " " + others;
			} else if(c131[i].value != "others"){
				C131 += c131[i].value + " ";
			}
		}
	}

	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_community_as_a_social_System" (
		  A1 TEXT,
		  A2 TEXT,
		  A3 TEXT,
		  A4 TEXT,
		  A5 TEXT,
		  B1 TEXT,
		  B2 TEXT,
		  B3 TEXT,
		  B4 TEXT,
		  C1 TEXT,
		  C2 TEXT,
		  C3 TEXT,
		  C4 TEXT,
		  C5 TEXT,
		  C6 TEXT,
		  C7 TEXT,
		  C7_Level TEXT,
		  C8 TEXT,
		  C8_Condition TEXT,
		  C9_Segregation TEXT,
		  C9_Container_Used TEXT,
		  C9_Container TEXT,
		  C9_Method_Of_Disposal TEXT,
		  C10_Toilet_Facilities TEXT,
		  C10_Level TEXT,
		  C10_Ownership TEXT,
		  C10_Distance_to_Toilet_Facility TEXT,
		  C10_Sanitary_Condition TEXT,
		  C12 TEXT,
		  C13_Presence_of_Vectors_and_Rodents TEXT,
		  C13_Ways_in_Controlling_Vectors TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_community_as_a_social_System`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_community_as_a_social_System already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			db.run(`INSERT INTO "${head}_community_as_a_social_System" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
			[	A1, 
				A2, 
				A3, 
				A4, 
				A5, 
				B1, 
				B2, 
				B3, 
				B4, 
				C1, 
				C2, 
				C3, 
				C4, 
				C5, 
				C6, 
				C7, 
				C7level, 
				C8, 
				C8condition, 
				C9segregation, 
				C9used, 
				C9container, 
				C9method,
				C10toilet,
				C10level,
				C10ownership,
				C10distance,
				C10sanitary,
				C12,
				C13,
				C131
			], function (err) {
			  if (err) {
				dialog.showMessageBox({
					type: 'warning',
					message: err,
					buttons: ['OK']
				  });
			  } else {
				console.log('success');
			  }
			});
		  }
		}
	  );

	  db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Domestic_Animals" (
		  Kind TEXT,
		  Number TEXT,
		  Where_Kept TEXT,
		  With_Vaccination TEXT,
		  Without_Vaccination TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Domestic_Animals already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Domestic_Animals already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			var table = document.getElementById('datable');
			if (!table) {
				dialog.showMessageBox({
					type: 'warning',
					message: `table not found`,
					buttons: ['OK']
				  });
			  return;
			}
			var table = document.getElementById("datable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var kind = document.getElementById("kind"+`${i}`).value;
				var number = document.getElementById("number"+`${i}`).value;
				var where = document.getElementById("where"+`${i}`).value;
				var vaccine = document.getElementById("vaccine"+`${i}`).value;
				var novaccine = document.getElementById("novaccine"+`${i}`).value;
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Domestic_Animals" VALUES (?, ?, ?, ?, ?)`, 
					[kind, number, where, vaccine, novaccine], function (err) {
					  if (err) {
						dialog.showMessageBox({
							type: 'warning',
							message: err,
							buttons: ['OK']
						  });
						reject(err);
					  } else {
						console.log('success');
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("All data inserted successfully");
				})
				.catch(function(err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				});
			}
		  }
		}
	);
	var Aothers = document.getElementById('Aothers').value;
	const healthPrograms = [
		{ name: 'Free Consultation', awareId: 'free-consultation-aware', utilizesId: 'free-consultation-utilizes' },
		{ name: 'Immunization', awareId: 'immunization-aware', utilizesId: 'immunization-utilizes' },
		{ name: 'Family Planning', awareId: 'family-planning-aware', utilizesId: 'family-planning-utilizes' },
		{ name: 'Pre-natal Check Up', awareId: 'pre-natal-check-up-aware', utilizesId: 'pre-natal-check-up-utilizes' },
		{ name: 'Well-baby Clinic', awareId: 'well-baby-clinic-aware', utilizesId: 'well-baby-clinic-utilizes' },
		{ name: `${Aothers}`, awareId: 'others-aware', utilizesId: 'others-utilizes'}
	  ];
	  
	  db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Community_Health_Programs" (
		  Health_Programs TEXT,
		  Aware TEXT,
		  Utilizes TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Community_Health_Programs`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Community_Health_Programs already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			const values = [];
			for (const program of healthPrograms) {
			  const awareInput = document.querySelector(`#${program.awareId}`);
			  const utilizesInput = document.querySelector(`#${program.utilizesId}`);
			  const awareValue = awareInput && awareInput.checked ? 'yes' : 'no';
			  const utilizesValue = utilizesInput && utilizesInput.checked ? 'yes' : 'no';
			  values.push(program.name, awareValue, utilizesValue);
			}
			const placeholders = healthPrograms.map(() => '(?, ?, ?)').join(', ');
			const sql = `INSERT INTO "${head}_Community_Health_Programs"('Health_Programs', 'Aware', 'Utilizes') VALUES ${placeholders}`;
			db.run(sql, values, function (err) {
			  if (err) {
				dialog.showMessageBox({
					type: 'warning',
					message: err,
					buttons: ['OK']
				  });
			  } else {
				console.log('success');
			  }
			});
		  }
		}
	  );

	var getba = document.getElementsByName('Ba');
	var getbb = document.getElementsByName('Bb');
	var getbc = document.getElementsByName('Bc');
	var getbd = document.getElementsByName('Bd');
	var getbe = document.getElementsByName('Be');
	var getbf = document.getElementsByName('Bf');
	var getbg = document.getElementsByName('Bg');
	var getbh = document.getElementsByName('Bh');
	var getbi = document.getElementsByName('Bi');
	var getbj = document.getElementsByName('Bj');
	var getbk = document.getElementsByName('Bk');
	var getbl = document.getElementsByName('Bl');
	var getbm = document.getElementsByName('Bm');
	var getbn = document.getElementsByName('Bn');
	var getbo = document.getElementsByName('Bo');


	  var ba = "";
	  var bb = "";
	  var bc = "";
	  var bd = "";
	  var be = "";
	  var bf = "";
	  var bg = "";
	  var bh = "";
	  var bi = "";
	  var bj = "";
	  var bk = "";
	  var bl = "";
	  var bm = "";
	  var bn = "";
	  var bo = "";

	  for(var i = 0; i < getba.length; i++){
		if(getba[i].checked){
			ba += getba[i].value
		}
	  }
	  for(var i = 0; i < getbb.length; i++){
		if(getbb[i].checked){
			bb += getbb[i].value
		}
	  }
	  for(var i = 0; i < getbc.length; i++){
		if(getbc[i].checked){
			bc += getbc[i].value
		}
	  }
	  for(var i = 0; i < getbd.length; i++){
		if(getbd[i].checked){
			bd += getbd[i].value
		}
	  }
	  for(var i = 0; i < getbe.length; i++){
		if(getbe[i].checked){
			be += getbe[i].value
		}
	  }
	  for(var i = 0; i < getbf.length; i++){
		if(getbf[i].checked){
			bf += getbf[i].value
		}
	  }
	  for(var i = 0; i < getbg.length; i++){
		if(getbg[i].checked){
			bg += getbg[i].value
		}
	  }
	  for(var i = 0; i < getbh.length; i++){
		if(getbh[i].checked){
			bh += getbh[i].value
		}
	  }
	  for(var i = 0; i < getbi.length; i++){
		if(getbi[i].checked){
			bi += getbi[i].value
		}
	  }
	  for(var i = 0; i < getbj.length; i++){
		if(getbj[i].checked){
			bj += getbj[i].value
		}
	  }
	  for(var i = 0; i < getbk.length; i++){
		if(getbk[i].checked){
			bk += getbk[i].value
		}
	  }
	  for(var i = 0; i < getbl.length; i++){
		if(getbl[i].checked){
			bl += getbl[i].value
		}
	  }
	  for(var i = 0; i < getbm.length; i++){
		if(getbm[i].checked){
			bm += getbm[i].value
		}
	  }
	  for(var i = 0; i < getbn.length; i++){
		if(getbn[i].checked){
			bn += getbn[i].value
		}
	  }
	  for(var i = 0; i < getbo.length; i++){
		if(getbo[i].checked){
			bo += getbo[i].value
		}
	  }

	  var barem = document.getElementById('baremark').value;
	  var bbrem = document.getElementById('bbremark').value;
	  var bcrem = document.getElementById('bcremark').value;
	  var bdrem = document.getElementById('bdremark').value;
	  var berem = document.getElementById('beremark').value;
	  var bfrem = document.getElementById('bfremark').value;
	  var bgrem = document.getElementById('bgremark').value;
	  var bhrem = document.getElementById('bhremark').value;
	  var birem = document.getElementById('biremark').value;
	  var bjrem = document.getElementById('bjremark').value;
	  var bkrem = document.getElementById('bkremark').value;
	  var blrem = document.getElementById('blremark').value;
	  var bmrem = document.getElementById('bmremark').value;
	  var bnrem = document.getElementById('bnremark').value;
	  var borem = document.getElementById('boremark').value;
	  
	  db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Family_Health_Practices" (
		  Health_Practices TEXT,
		  Practiced_or_Not_Practiced TEXT,
		  Frequency_or_Remarks TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Family_Health_Practices`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Family_Health_Practices already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			db.run(`INSERT INTO "${head}_Family_Health_Practices" (Health_Practices, Practiced_or_Not_Practiced, Frequency_or_Remarks) 
			VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)`,
			  [
			  'Use of Hygienic Products', `${ba}`, `${barem}`,
			  'Sleep 6-8 hrs/day', `${bb}`, `${bbrem}`,
			  'Brushes Teeth', `${bc}`, `${bcrem}`, 
			  'Cuts Nails', `${bd}`, `${bdrem}`, 
			  'Cleans Ears', `${be}`, `${berem}`,
			  'Changes Clothes', `${bf}`,`${bfrem}`, 
			  'Eats Balanced Diet', `${bg}`, `${bgrem}`, 
			  'Smoking', `${bh}`, `${bhrem}`,
			  'Regular Excercise', `${bi}`,  `${birem}`, 
			  'Use Prohibited Drugs', `${bj}`,  `${bjrem}`, 
			  'Dental Check Up', `${bk}`, `${bkrem}`, 
			  'Drinking Alcohol Beverages', `${bl}`, `${blrem}`,
			  'Medical Check-up', `${bm}`, `${bmrem}`, 
			  'Recreational Relaxation Activities', `${bn}`,`${bnrem}`, 
			  'Go to Church Regularly', `${bo}`,`${borem}`
			  ], function (err) {
				if (err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				} else {
				  console.log('success');
				}
			  });
		  }
		}
	  );

	  var c = document.getElementsByName('C');
	  var d = document.getElementsByName('D');
	  var cothers = document.getElementById('cothers').value;
	  var dothers = document.getElementById('dothers').value;
	  var C = "";
	  var D = "";

	  for(var i = 0; i < c.length; i++){
		if(c[i].checked){
			if(c[i].value != "others"){
			C += c[i].value;
		} 
		if(c[i].value == "others"){
			C += cothers;
		}
		}
	}

	for(var i = 0; i < d.length; i++){
		if(d[i].checked){
			if(d[i].value != "others"){
			D += d[i].value;
		} 
		if(d[i].value == "others"){
			D += dothers;
		}
		}
	}



	  db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Health_Ascpects" (
		  C TEXT,
		  D TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Health_Ascpects`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Health_Ascpects already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			db.run(`INSERT INTO "${head}_Health_Ascpects" VALUES (?, ?)`, 
			[	C, 
				D
			], function (err) {
			  if (err) {
				dialog.showMessageBox({
					type: 'warning',
					message: err,
					buttons: ['OK']
				  });
			  } else {
				console.log('success');
			  }
			});
		  }
		}
	  );

	  db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Method_of_Family_Planning" (
		  Name TEXT,
		  Age TEXT,
		  Acceptor TEXT,
		  Method TEXT,
		  Types TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Method_of_Family_Planning already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Method_of_Family_Planning already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			var table = document.getElementById('mfptable');
			if (!table) {
				dialog.showMessageBox({
					type: 'warning',
					message: `table not found`,
					buttons: ['OK']
				  });
			  return;
			}
			var table = document.getElementById("mfptable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var name = document.getElementById("name"+`${i}`).value;
				var age = document.getElementById("Age"+`${i}`).value;
				var method = document.getElementById("method"+`${i}`).value;
				var types = document.getElementById("types"+`${i}`).value;
				var accept = document.querySelectorAll('input[name="E'+ i +'"]');
				var acceptor = "";
				for(var e = 0; e < accept.length; e++){
    				if(accept[e].checked){
        				acceptor += accept[e].value;
    				}
				}
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Method_of_Family_Planning" VALUES (?, ?, ?, ?, ?)`, 
					[name, age, acceptor, method, types], function (err) {
					  if (err) {
						dialog.showMessageBox({
							type: 'warning',
							message: err,
							buttons: ['OK']
						  });
						reject(err);
					  } else {
						console.log('success');
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("All data inserted successfully");
				})
				.catch(function(err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				});
			}
		  }
		}
	);

	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Immunization_Status" (
		  Name TEXT,
		  Age TEXT,
		  BCG TEXT,
		  Hepa_B TEXT,
		  Penta TEXT,
		  PCV TEXT,
		  OPV TEXT,
		  IPV TEXT,
		  MMR TEXT,
		  Remarks TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Immunization_Status already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Immunization_Status already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			var table = document.getElementById('istagtable');
			if (!table) {
				dialog.showMessageBox({
					type: 'warning',
					message: `table not found`,
					buttons: ['OK']
				  });
			  return;
			}
			var table = document.getElementById("istagtable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var name = document.getElementById("name1"+`${i}`).value;
				var age = document.getElementById("age1"+`${i}`).value;
				var bcg = document.getElementById("bcg1"+`${i}`).value;
				var hepab = document.getElementById("hepab1"+`${i}`).value;
				var getpenta = document.querySelectorAll('input[name="penta'+ i +'"]');
				var getpcv = document.querySelectorAll('input[name="pcv'+ i +'"]');
				var getopv = document.querySelectorAll('input[name="opv'+ i +'"]');
				var ipv = document.getElementById("ipv"+`${i}`).value;
				var getmmr = document.querySelectorAll('input[name="mmr'+ i +'"]');
				var getremarks = document.querySelectorAll('input[name="remarks'+ i +'"]');
				var penta = "";
				var pcv = "";
				var opv = "";
				var mmr = "";
				var remarks = "";
				for(var f = 0; f < getpenta.length; f++){
    				if(getpenta[f].checked){
        				penta += getpenta[f].value + " ";
    				}
				}
				for(var f = 0; f < getpcv.length; f++){
    				if(getpcv[f].checked){
        				pcv += getpcv[f].value + " ";
    				}
				}
				for(var f = 0; f < getopv.length; f++){
    				if(getopv[f].checked){
        				opv += getopv[f].value + " ";
    				}
				}
				for(var f = 0; f < getmmr.length; f++){
    				if(getmmr[f].checked){
        				mmr += getmmr[f].value + " ";
    				}
				}
				for(var f = 0; f < getremarks.length; f++){
    				if(getremarks[f].checked){
        				remarks += getremarks[f].value + " ";
    				}
				}
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Immunization_Status" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
					[name, age, bcg, hepab, penta, pcv, opv, ipv, mmr, remarks], function (err) {
					  if (err) {
						dialog.showMessageBox({
							type: 'warning',
							message: err,
							buttons: ['OK']
						  });
						reject(err);
					  } else {
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("success");
				})
				.catch(function(err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				});
			}
		  }
		}
	);

	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Maternal_Care" (
		  Name TEXT,
		  No_of_Pregnancy TEXT,
		  Age_of_Gestation TEXT,
		  EDC TEXT,
		  Prenatal_Check_up TEXT,
		  Tetanus_Toxoid TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Maternal_Care already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Maternal_Care already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			var table = document.getElementById('mctable');
			if (!table) {
				dialog.showMessageBox({
					type: 'warning',
					message: `table not found`,
					buttons: ['OK']
				  });
			  return;
			}
			var table = document.getElementById("mctable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var name = document.getElementById("name2"+`${i}`).value;
				var pregnancy = document.getElementById("pregnancy"+`${i}`).value;
				var gestation = document.getElementById("gestation"+`${i}`).value;
				var edc = document.getElementById("edc"+`${i}`).value;
				var getG = document.querySelectorAll('input[name="G'+ i +'"]');
				var getTT = document.querySelectorAll('input[name="tt'+ i +'"]');
				var G = "";
				var TT = "";
				for(var f = 0; f < getG.length; f++){
    				if(getG[f].checked){
        				G += getG[f].value;
    				}
				}
				for(var f = 0; f < getTT.length; f++){
    				if(getTT[f].checked){
        				TT += getTT[f].value + " ";
    				}
				}
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Maternal_Care" VALUES (?, ?, ?, ?, ?, ?)`, 
					[name, pregnancy, gestation, edc, G, TT], function (err) {
					  if (err) {
						dialog.showMessageBox({
							type: 'warning',
							message: err,
							buttons: ['OK']
						  });
						reject(err);
					  } else {
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("success");
				})
				.catch(function(err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				});
			}
		  }
		}
	);

	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Morbidity" (
		  Name TEXT,
		  Age TEXT,
		  Sex TEXT,
		  Type_of_Disease TEXT,
		  Intervention TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Morbidity already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Morbidity already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			var table = document.getElementById('morbtable');
			if (!table) {
				dialog.showMessageBox({
					type: 'warning',
					message: `table not found`,
					buttons: ['OK']
				  });
			  return;
			}
			var table = document.getElementById("morbtable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var name = document.getElementById("name3"+`${i}`).value;
				var age = document.getElementById("age3"+`${i}`).value;
				var sex = document.getElementById("sex3"+`${i}`).value;
				var disease = document.getElementById("disease3"+`${i}`).value;
				var intervention = document.getElementById("intervention3"+`${i}`).value;
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Morbidity" VALUES (?, ?, ?, ?, ?)`, 
					[name, age, sex, disease, intervention], function (err) {
					  if (err) {
						dialog.showMessageBox({
							type: 'warning',
							message: err,
							buttons: ['OK']
						  });
						reject(err);
					  } else {
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("success");
				})
				.catch(function(err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				});
			}
		  }
		}
	);

	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Mortality" (
		  Name TEXT,
		  Age TEXT,
		  Sex TEXT,
		  Cause_of_Death TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Mortality already exists`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Mortality already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			var table = document.getElementById('morttable');
			if (!table) {
				dialog.showMessageBox({
					type: 'warning',
					message: `table not found`,
					buttons: ['OK']
				  });
			  return;
			}
			var table = document.getElementById("morttable");
			if (table) {
			  var tbody = table.getElementsByTagName('tbody')[0];
			  var promises = [];
			  for (var i = 1; i < tbody.rows.length+1; i++) {
				var name = document.getElementById("name4"+`${i}`).value;
				var age = document.getElementById("age4"+`${i}`).value;
				var sex = document.getElementById("sex4"+`${i}`).value;
				var death = document.getElementById("death4"+`${i}`).value;
				var promise = new Promise(function(resolve, reject) {
				  db.run(`INSERT INTO "${head}_Mortality" VALUES (?, ?, ?, ?)`, 
					[name, age, sex, death], function (err) {
					  if (err) {
						dialog.showMessageBox({
							type: 'warning',
							message: err,
							buttons: ['OK']
						  });
						reject(err);
					  } else {
						resolve();
					  }
					});
				});
				promises.push(promise);
			  }
			  Promise.all(promises)
				.then(function() {
				  console.log("success");
				})
				.catch(function(err) {
					dialog.showMessageBox({
						type: 'warning',
						message: err,
						buttons: ['OK']
					  });
				});
			}
		  }
		}
	);

	var sources = document.querySelectorAll('input[name="sources"]');
	var vothers = document.getElementById('vothers').value;
	var newsource = '';

	for(var i = 0; i < sources.length; i++){
		if(sources[i].checked){
			if(sources[i].value != "others"){
				newsource += sources[i].value + " ";
			} else if(sources[i].value == "others"){
				newsource += sources[i].value + " " + vothers;
			}
		}
	}

	db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Sources_of_Information_and_Communication" (
		  Sources TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Sources_of_Information_and_Communication`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Sources_of_Information_and_Communication already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			db.run(`INSERT INTO "${head}_Sources_of_Information_and_Communication" VALUES (?)`, 
			[	newsource
			], function (err) {
			  if (err) {
				dialog.showMessageBox({
					type: 'warning',
					message: err,
					buttons: ['OK']
				  });
			  } else {
				console.log('success');
			  }
			});
		  }
		}
	  );

	  var cultural = document.getElementById("cultural").value;
	  var supernatural = document.getElementById("supernatural").value;
	  var condition = document.getElementById("condition").value;

	  db.run(
		`CREATE TABLE IF NOT EXISTS "${head}_Cultural_Patterns_and_Beliefs" (
		  Common_Cultural_Beliefs TEXT,
		  Beliefs_in_Supernatural_Beings TEXT,
		  Beliefs_in_Illness_Disease_Condition TEXT
		)`,
		function (err) {
		  if (err && err.code === 'SQLITE_ERROR' && (err.message.includes(`table ${head}_Cultural_Patterns_and_Beliefs`) || err.message.includes(`database ${head}.db already exists`))) {
			dialog.showMessageBox({
				type: 'warning',
				message: `${head}_Cultural_Patterns_and_Beliefs already exists`,
				buttons: ['OK']
			  });
		  } else if (err) {
			dialog.showMessageBox({
				type: 'warning',
				message: err,
				buttons: ['OK']
			  });
		  } else {
			db.run(`INSERT INTO "${head}_Cultural_Patterns_and_Beliefs" VALUES (?, ?, ?)`, 
			[
				cultural,
				supernatural,
				condition
			], function (err) {
			  if (err) {
				dialog.showMessageBox({
					type: 'warning',
					message: err,
					buttons: ['OK']
				  });
			  } else {
				console.log('success');
			  }
			});
		  }
		}
	  );

	  smalltalk
    .confirm('Save Database', 'Are you sure?')
    .then(() => {
        console.log('yes');
    })
    .catch(() => {
        console.log('no');
    });
	   
}

  function addnew1() { 
    var table = document.getElementById("datable");
	if (table) {
	  var tbody = table.getElementsByTagName('tbody')[0];
	  var row = tbody.insertRow(-1);
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);
	  var cell5 = row.insertCell(4);
	  var rowCount = tbody.rows.length;
	  cell1.innerHTML = `<input type='text' id='kind${rowCount}'>`;
	  cell2.innerHTML = `<input type='text' id='number${rowCount}'>`;
	  cell3.innerHTML = `<input type='text' id='where${rowCount}'>`;
	  cell4.innerHTML = `<input type='text' id='vaccine${rowCount}'>`;
	  cell5.innerHTML = `<input type='text' id='novaccine${rowCount}'>`;
	}
}

function deleteit1(){
    var table = document.getElementById("datable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew2() { 
    var table = document.getElementById('mfptable');
    var row = table.insertRow(-1);
	if (table) {
		var tbody = table.getElementsByTagName('tbody')[0];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var rowCount = tbody.rows.length;
		cell1.innerHTML = `<input type='text' id="name${rowCount}">`;
		cell2.innerHTML = `<input type='text' id="Age${rowCount}">`;
		cell3.innerHTML = `<input type='radio' value='Yes' name="E${rowCount}">Yes &nbsp; <input type='radio' value='No' name="E${rowCount}">No`;
		cell4.innerHTML = `<input type='text' id="method${rowCount}">`;
		cell5.innerHTML = `<input type='text' id="types${rowCount}">`;
	}
}

function deleteit2(){
    var table = document.getElementById("mfptable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew3() { 
    var table = document.getElementById('istagtable');
    var row = table.insertRow(-1);
	if (table) {
		var tbody = table.getElementsByTagName('tbody')[0];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		var cell7 = row.insertCell(6);
		var cell8 = row.insertCell(7);
		var cell9 = row.insertCell(8);
		var cell10 = row.insertCell(9);
		var rowCount = tbody.rows.length;
		cell1.innerHTML = `<input type='text' id='name1${rowCount}'>`;
		cell2.innerHTML = `<input type='text' id='age1${rowCount}'>`;
		cell3.innerHTML = `<input type='text' id='bcg1${rowCount}'>`;
		cell4.innerHTML = `<input type='text' id='hepab1${rowCount}'>`;
		cell5.innerHTML = `<input type='checkbox' name='penta${rowCount}' value=1>1<input type='checkbox' name='penta${rowCount}' value='2'>2<input type='checkbox' name='penta${rowCount}' value='3'>3`;
		cell6.innerHTML = `<input type='checkbox' name='pcv${rowCount}' value='1'>1<input type='checkbox' name='pcv${rowCount}' value='2'>2<input type='checkbox' name='pcv${rowCount}' value='3'>3`;
		cell7.innerHTML = `<input type='checkbox' name='opv${rowCount}' value='1'>1<input type='checkbox' name='opv${rowCount}' value='2'>2<input type='checkbox' name='opv${rowCount}' value='3'>3`;
		cell8.innerHTML = `<input type='text' id='ipv${rowCount}'>`;
		cell9.innerHTML = `<input type='checkbox' name='mmr${rowCount}' value='1'>1<input type='checkbox' name='mmr${rowCount}' value='2'>2`;
		cell10.innerHTML = `<input type='checkbox' name='remarks${rowCount}' value='Inc'>Inc<input type='checkbox' name='remarks${rowCount}' value='CIC'>CIC<input type='checkbox' name='remarks${rowCount}' value='FIC'>FIC`;
	}
}

function deleteit3(){
    var table = document.getElementById("istagtable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew4() { 
    var table = document.getElementById('mctable');
    var row = table.insertRow(-1);
	if (table) {
		var tbody = table.getElementsByTagName('tbody')[0];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		var rowCount = tbody.rows.length;
		cell1.innerHTML = `<input type='text' id='name2${rowCount}'>`;
		cell2.innerHTML = `<input type='text' id='pregnancy${rowCount}'>`;
		cell3.innerHTML = `<input type='text' id='gestation${rowCount}'>`;
		cell4.innerHTML = `<input type='text' id='edc${rowCount}'>`;
		cell5.innerHTML = `<input type='radio' name='G${rowCount}' value='Yes'>Yes<input type='radio' name='G${rowCount}' value='No'>No`;
		cell6.innerHTML = `<input type='checkbox' name='tt${rowCount}' value='TT1'>TT1<input type='checkbox' name='tt${rowCount}' value='TT2'>TT2<input type='checkbox' name='tt${rowCount}' value='TT3'>TT3<input type='checkbox'  name='tt${rowCount}' value='TT4'>TT4<input type='checkbox'  name='tt${rowCount}' value='TT5'>TT5`;
	}
}

function deleteit4(){
    var table = document.getElementById("mctable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew5() { 
    var table = document.getElementById('morbtable');
    var row = table.insertRow(-1);
	if (table) {
		var tbody = table.getElementsByTagName('tbody')[0];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var rowCount = tbody.rows.length;
		cell1.innerHTML = `<input type='text' id='name3${rowCount}'>`;
		cell2.innerHTML = `<input type='text' id='age3${rowCount}'>`;
		cell3.innerHTML = `<input type='text' id='sex3${rowCount}'>`;
		cell4.innerHTML = `<input type='text' id='disease3${rowCount}'>`;
		cell5.innerHTML = `<input type='text' id='intervention3${rowCount}'>`;
	}
}

function deleteit5(){
    var table = document.getElementById("morbtable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function addnew6() { 
    var table = document.getElementById('morttable');
    var row = table.insertRow(-1);
	if (table) {
		var tbody = table.getElementsByTagName('tbody')[0];
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var rowCount = tbody.rows.length;
		cell1.innerHTML = `<input type='text' id='name4${rowCount}'>`;
		cell2.innerHTML = `<input type='text' id='age4${rowCount}'>`;
		cell3.innerHTML = `<input type='text' id='sex4${rowCount}'>`;
		cell4.innerHTML = `<input type='text' id='death4${rowCount}'>`;
	}
}

function deleteit6(){
    var table = document.getElementById("morttable");
			var rowCount = table.rows.length;
			if (rowCount > 2) {
				table.deleteRow(rowCount - 1);
			}
}

function btngo(){
	location.href = 'view.html';
}