const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const contentSelect = document.getElementById('content-select');
const searchBar = document.getElementById('search-bar');

const folderPath = path.join(__dirname, 'Databases');
let files = [];

function initialize() {
  fs.readdir(folderPath, (err, fileList) => {
    if (err) {
      console.error(err);
      return;
    }

    files = fileList.sort();
    renderDatabaseOptions(files);
  });
}

function renderDatabaseOptions(databaseFiles) {
  const selectedOption = contentSelect.value;

  const disabledOption = contentSelect.querySelector('option:disabled');

  contentSelect.innerHTML = '';

  if (disabledOption) {
    contentSelect.appendChild(disabledOption);
  }

  databaseFiles.forEach((file) => {
    const option = document.createElement('option');
    option.value = file;
    option.textContent = file;
    contentSelect.appendChild(option);
  });

  if (selectedOption && databaseFiles.includes(selectedOption)) {
    contentSelect.value = selectedOption;
  } else {
    contentSelect.value = '';
  }
}

function handleSearch() {
  const searchQuery = searchBar.value.toLowerCase().replace(' ', '_');
  const filteredFiles = files.filter((file) =>
    file.toLowerCase().includes(searchQuery)
  );

  renderDatabaseOptions(filteredFiles);
}

initialize();

searchBar.addEventListener('input', handleSearch);

contentSelect.addEventListener('change', (event) => {
  const selectedFile = event.target.value;
  console.log(selectedFile);
  var db = new sqlite3.Database(path.join(__dirname, './Databases', selectedFile));
  
  const tableName = path.parse(selectedFile).name;
  db.get(`SELECT Family_Head FROM ${tableName}_info`, (err, row) => {
    head.value = row.Family_Head.replace('_', ' ');
  });

  var head = document.getElementById('head');
    var numfam = document.getElementById('numfam');
    var address = document.getElementById('address');
    var length = document.getElementById('length');
    var ethnic = document.getElementById('ethnic');
    var famtype = document.getElementById('famtype');
    var primdia = document.getElementById('primdia');

  db.get(`SELECT * FROM ${tableName}_info`, (err, row) => {
    head.innerHTML = `<ul><li>Head of the Family: <b>${row.Family_Head.replace('_', ' ')}</b></li></ul>`;
    numfam.innerHTML = `<ul><li>No. of Family Member: <b>${row.No_of_Family_Member}</b></li></ul>`;
    address.innerHTML = `<ul><li>Complete Address: <b>${row.Complete_Address}</b></li></ul>`;
    length.innerHTML = `<ul><li>Length of Residency: <b>${row.Length_of_Residency}</b></li></ul>`;
    ethnic.innerHTML = `<ul><li>Ethnic Group: <b>${row.Ethnic_Group}</b></li></ul>`;
    famtype.innerHTML = `<ul><li>Type of Family: <b>${row.Type_of_Family}</b></li></ul>`;
    primdia.innerHTML = `<ul><li>Primary Dialect: <b>${row.Primary_Dialect}</b></li></ul>`;
  });

  var lanare = document.getElementById('lanare');
  var bound = document.getElementById('bound');
  var north = document.getElementById('north');
  var west = document.getElementById('west');
  var east = document.getElementById('east');
  var south = document.getElementById('south');
  var nscb = document.getElementById('nscb');
  var dslbh = document.getElementById('dslbh');
  var dbtp = document.getElementById('dbtp');
  var dbnh = document.getElementById('dbnh');
  var faci = document.getElementById('faci');
  var trans = document.getElementById('trans');
  var natres = document.getElementById('natres');

  db.get(`SELECT * FROM ${tableName}_PhysicalGeographical_Data`, (err, row) => {
    lanare.innerHTML = `<ul><li>Land Area: <b>${row.Land_Area}</b></li></ul>`;
    bound.innerHTML = "<b>Boundaries of the Barangay</b>"
    north.innerHTML = `<ul><li>North: <b>${row.Boundary_North}</b></li></ul>`;
    west.innerHTML = `<ul><li>West: <b>${row.Boundary_West}</b></li></ul>`;
    east.innerHTML = `<ul><li>East: <b>${row.Boundary_East}</b></li></ul>`;
    south.innerHTML = `<ul><li>South: <b>${row.Boundary_South}</b></li></ul>`;
    nscb.innerHTML = `<ul><li>Names of Sitios Composing the Barangay: <b>${row.Sitios_Composing_Barangay}</b></li></ul>`;
    dslbh.innerHTML = `<ul><li>Distance of Sitios from the Landmark (Barangay Hall): <b>${row.Sitio_Distance_From_Landmark}</b></li></ul>`;
    dbtp.innerHTML = `<ul><li>Distance of the Barangay from Town Proper: <b>${row.Sitio_Distance_From_Town_Proper}</b></li></ul>`;
    dbnh.innerHTML = `<ul><li>Distance of the Barangay from the National Highway: <b>${row.Sitio_Distance_From_National_Highway}</b></li></ul>`;
    faci.innerHTML = `<ul><li>Facilities: <b>${row.Facilities}</b></li></ul>`;
    trans.innerHTML = `<ul><li>Transportation: <b>${row.Transportation}</b></li></ul>`;
    natres.innerHTML = `<ul><li>Natural Resources: <b>${row.Natural_Resources}</b></li></ul>`;
  });

  db.all(`SELECT * FROM ${tableName}_Family_Structure`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    const table = document.getElementById('captable');
    rows.forEach((row) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.No}</td>
                    <td>${row.Name_of_Household_Member}</td>
                    <td>${row.Relation_to_Head}</td>
                    <td>${row.Age}</td>
                    <td>${row.Sex}</td>
                    <td>${row.Birth_Date}</td>
                    <td>${row.Civil_Status}</td>
                    <td>${row.Occupation}</td>
                    <td>${row.Occupational_Status}</td>
                    <td>${row.Highest_Educational_Attainment}</td>
                    <td>${row.Religion}</td>`;
    table.appendChild(tr);
    });
    });

    var a1 = document.getElementById('a1');
    var a2 = document.getElementById('a2');
    var a3 = document.getElementById('a3');
    var a4 = document.getElementById('a4');
    var a5 = document.getElementById('a5');
    var b1 = document.getElementById('b1');
    var b2 = document.getElementById('b2');
    var b3 = document.getElementById('b3');
    var b4 = document.getElementById('b4');
    var c1 = document.getElementById('c1');
    var c2 = document.getElementById('c2');
    var c3 = document.getElementById('c3');
    var c4 = document.getElementById('c4');
    var c5 = document.getElementById('c5');
    var c6 = document.getElementById('c6');
    var c7 = document.getElementById('c7');
    var c71 = document.getElementById('c71');
    var c8 = document.getElementById('c8');
    var c81 = document.getElementById('c81');
    var c9 = document.getElementById('c9');
    var c91 = document.getElementById('c91');
    var c92 = document.getElementById('c92');
    var c93 = document.getElementById('c93');
    var c10 = document.getElementById('c10');
    var c101 = document.getElementById('c101');
    var c102 = document.getElementById('c102');
    var c103 = document.getElementById('c103');
    var c104 = document.getElementById('c104');
    var c12 = document.getElementById('c12');
    var c13 = document.getElementById('c13');
    var c131 = document.getElementById('c131');


    db.get(`SELECT * FROM ${tableName}_community_as_a_social_System`, (err, row) => {
      a1.innerHTML = `<ul><li><b>${row.A1}</b></li></ul>`;
      a2.innerHTML = `<ul><li><b>${row.A2}</b></li></ul>`;
      a3.innerHTML = `<ul><li><b>${row.A3}</b></li></ul>`;
      a4.innerHTML = `<ul><li><b>${row.A4}</b></li></ul>`;
      a5.innerHTML = `<ul><li><b>${row.A5}</b></li></ul>`;
      b1.innerHTML = `<ul><li><b>${row.B1}</b></li></ul>`;
      b2.innerHTML = `<ul><li><b>${row.B2}</b></li></ul>`;
      b3.innerHTML = `<ul><li><b>${row.B3}</b></li></ul>`;
      b4.innerHTML = `<ul><li><b>${row.B4}</b></li></ul>`;
      c1.innerHTML = `<ul><li><b>${row.C1}</b></li></ul>`;
      c2.innerHTML = `<ul><li><b>${row.C2}</b></li></ul>`;
      c3.innerHTML = `<ul><li><b>${row.C3}</b></li></ul>`;
      c4.innerHTML = `<ul><li><b>${row.C4}</b></li></ul>`;
      c5.innerHTML = `<ul><li><b>${row.C5}</b></li></ul>`;
      c6.innerHTML = `<ul><li><b>${row.C6}</b></li></ul>`;
      c7.innerHTML = "<ul><li>Type: " + `<b>${row.C7}</b></li></ul>`;
      c71.innerHTML = "<ul><li>Level: " + `<b>${row.C7_Level}</b></li></ul>`;
      c8.innerHTML = "<ul><li>Type: "+`<b>${row.C8}</b></li></ul>`;
      c81.innerHTML = "<ul><li>Condition: " + `<b>${row.C8_Condition}</b></li></ul>`;
      c9.innerHTML = "<ul><li>Waste Garbage Segregation: " + `<b>${row.C9_Segregation}</b></li></ul>`;
      c91.innerHTML = "<ul><li>Container Used in Garbage: " + `<b>${row.C9_Container_Used}</b></li></ul>`;
      c92.innerHTML = "<ul><li>Container: " + `<b>${row.C9_Container}</b></li></ul>`;
      c93.innerHTML = "<ul><li>Method of Disposal: " + `<b>${row.C9_Method_Of_Disposal}</b></li></ul>`;
      c10.innerHTML = "<ul><li>Type: "+`<b>${row.C10_Toilet_Facilities}</b></li></ul>`;
      c101.innerHTML = "<ul><li>Level: " + `<b>${row.C10_Level}</b></li></ul>`;
      c102.innerHTML = "<ul><li>Ownership: "+`<b>${row.C10_Ownership}</b></li></ul>`;
      c103.innerHTML = "<ul><li>Distance from the House to Toilet Facility: "+`<b>${row.C10_Distance_to_Toilet_Facility}</b></li></ul>`;
      c104.innerHTML = "<ul><li>Sanitary Condition: "+`<b>${row.C10_Sanitary_Condition}</b></li></ul>`;
      db.all(`SELECT * FROM ${tableName}_Domestic_Animals`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        const table = document.getElementById('datable');
        rows.forEach((row) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.Kind}</td>
                        <td>${row.Number}</td>
                        <td>${row.Where_Kept}</td>
                        <td>${row.With_Vaccination}</td>
                        <td>${row.Without_Vaccination}</td>`;
        table.appendChild(tr);
        });
        });
        c12.innerHTML = "<ul><li>"+`<b>${row.C12}</b></li></ul>`;
        c13.innerHTML = "<ul><li>Presence Of Vectors And Rodents: "+`<b>${row.C13_Presence_of_Vectors_and_Rodents}</b></li></ul>`;
        c131.innerHTML = "<ul><li>Ways in Controlling of Vectors: "+`<b>${row.C13_Ways_in_Controlling_Vectors}</b></li></ul>`;
    });

    db.all(`SELECT * FROM ${tableName}_Community_Health_Programs`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      const table = document.getElementById('chptable');
      rows.forEach((row) => {
      let tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.Health_Programs}</td>
                      <td>${row.Aware}</td>
                      <td>${row.Utilizes}</td>`;
      table.appendChild(tr);
      });
      });

    db.all(`SELECT * FROM ${tableName}_Family_Health_Practices`, [], (err, rows) => {
      if (err) {
        throw err;
      }
      const table = document.getElementById('fhptable');
      rows.forEach((row) => {
      let tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.Health_Practices}</td>
                      <td>${row.Practiced_or_Not_Practiced}</td>
                      <td>${row.Frequency_or_Remarks}</td>`;
      table.appendChild(tr);
      });
      });

      var c = document.getElementById('c');
      var d = document.getElementById('d');

      db.get(`SELECT * FROM ${tableName}_Health_Ascpects`, (err, row) => {
        c.innerHTML = `<ul><li><b>${row.C}</b></li></ul>`;
        d.innerHTML = `<ul><li><b>${row.D}</b></li></ul>`;
      });

      db.all(`SELECT * FROM ${tableName}_Method_of_Family_Planning`, [], (err, rows) => {
        if (err) {
          throw err;
        }
        const table = document.getElementById('mfptable');
        rows.forEach((row) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.Name}</td>
                        <td>${row.Age}</td>
                        <td>${row.Acceptor}</td>
                        <td>${row.Method}</td>
                        <td>${row.Types}</td>`;
        table.appendChild(tr);
        });
        });

        db.all(`SELECT * FROM ${tableName}_Immunization_Status`, [], (err, rows) => {
          if (err) {
            throw err;
          }
          const table = document.getElementById('istagtable');
          rows.forEach((row) => {
          let tr = document.createElement('tr');
          tr.innerHTML = `<td>${row.Name}</td>
                          <td>${row.Age}</td>
                          <td>${row.BCG}</td>
                          <td>${row.Hepa_B}</td>
                          <td>${row.Penta}</td>
                          <td>${row.PCV}</td>
                          <td>${row.OPV}</td>
                          <td>${row.IPV}</td>
                          <td>${row.MMR}</td>
                          <td>${row.Remarks}</td>`;
          table.appendChild(tr);
          });
          });

          db.all(`SELECT * FROM ${tableName}_Maternal_Care`, [], (err, rows) => {
            if (err) {
              throw err;
            }
            const table = document.getElementById('mctable');
            rows.forEach((row) => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.Name}</td>
                            <td>${row.No_of_Pregnancy}</td>
                            <td>${row.Age_of_Gestation}</td>
                            <td>${row.EDC}</td>
                            <td>${row.Prenatal_Check_up}</td>
                            <td>${row.Tetanus_Toxoid}</td>`;
            table.appendChild(tr);
            });
            });

            db.all(`SELECT * FROM ${tableName}_Morbidity`, [], (err, rows) => {
              if (err) {
                throw err;
              }
              const table = document.getElementById('morbtable');
              rows.forEach((row) => {
              let tr = document.createElement('tr');
              tr.innerHTML = `<td>${row.Name}</td>
                              <td>${row.Age}</td>
                              <td>${row.Sex}</td>
                              <td>${row.Type_of_Disease}</td>
                              <td>${row.Intervention}</td>`;
              table.appendChild(tr);
              });
              });

              db.all(`SELECT * FROM ${tableName}_Mortality`, [], (err, rows) => {
                if (err) {
                  throw err;
                }
                const table = document.getElementById('morttable');
                rows.forEach((row) => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.Name}</td>
                                <td>${row.Age}</td>
                                <td>${row.Sex}</td>
                                <td>${row.Cause_of_Death}</td>`;
                table.appendChild(tr);
                });
                });

              var sources = document.getElementById('sources');
              db.get(`SELECT * FROM ${tableName}_Sources_of_Information_and_Communication`, (err, row) => {
                sources.innerHTML = `<ul><li><b>${row.Sources}</b></li></ul>`;
              });

              var cultural = document.getElementById('cultural');
              var supernatural = document.getElementById('supernatural');
              var illness = document.getElementById('illness');
              db.get(`SELECT * FROM ${tableName}_Cultural_Patterns_and_Beliefs`, (err, row) => {
                cultural.innerHTML = `<ul><li><b>${row.Common_Cultural_Beliefs}</b></li></ul>`;
                supernatural.innerHTML = `<ul><li><b>${row.Beliefs_in_Supernatural_Beings}</b></li></ul>`;
                illness.innerHTML = `<ul><li><b>${row.Beliefs_in_Illness_Disease_Condition}</b></li></ul>`;
              });
           
    });
 