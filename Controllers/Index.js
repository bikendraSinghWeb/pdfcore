
const nodemailer = require('nodemailer');
const userModel = require('../models/createnewpdf');
const registerModel = require('../models/register');
const puppeteer = require('puppeteer');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const useMessage = require('../message')


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  pdfRegisterDataApi: async (req, res) => {
    try {
      const email = req.body.email;
      const userExist = await userModel.findOne({ email: email });
      if (userExist) {
        res.status(401).json({
          message: useMessage.ALREADY_EXIT,
          success: false,
        });
      } else {
        const user = new userModel(req.body);
        const signatureImageBase64 = req.body.signatureImage;

        const pdfData = {
          clientSurname: req.body.clientSurname,
          clientFirstname: req.body.clientFirstname,
          surname: req.body.surname,
          firstname: req.body.firstname,
          homePhone: req.body.homePhone,
          mobilePhone: req.body.mobilePhone,
          workphone: req.body.workphone,
          email: req.body.email,
          address: req.body.address,
          name: req.body.name,
          Position: req.body.Position,
          Organisation: req.body.Organisation,
          ContactDetail: req.body.ContactDetail,
          referrerReason: req.body.referrerReason,
          countryOfBirth: req.body.countryOfBirth,
          preferredLanguage: req.body.preferredLanguage,
          aboriginal: req.body.aboriginal,
          interpreter: req.body.interpreter,
          otherSupport: req.body.otherSupport,
          actionTaken: req.body.actionTaken,
          guardianDeclaration: req.body.guardianDeclaration,
          signatureImage: signatureImageBase64,
        };

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const htmlContent = `
      <html>
      <head>
      <style>
          *:focus {
              outline: none;
          }
        .heading{
          border: 1px solid #ccc;
          width: 95%;
          height: 150px;
          display: flex;
          margin: auto;
          margin-bottom: 15px;
        }
        .headfieldbig{
          width: 60%;
          border: 1px solid #ccc;
        }
        .headfieldbig h2{
          margin-left: 10px;
          margin-top: 65px;
        }
        .headfield1{
          width: 15%;
          border: 1px solid #ccc;
        }
        .headfield2 img{
          height: 150px;
          margin-left: 20px;
          margin-top: 0px;    
          }
        .date_managed{
          display: flex;
          width: 93%;
          margin: auto;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        .table{
          width: 93%;
          margin: auto;
      }
      table, td, th, input{
          border: 1px solid rgb(131, 126, 126);
        }
      .tablemain {
          width: 100%;
          margin-bottom: 5vh;
          border-collapse: collapse;
      }
      .table_Head{
          background-color:rgb(220, 221, 172) ;
          text-align: left;
          width: 100%;
      }
      .table_Head th {
          margin-left: 10px;
          padding: 10px;
      }
      .tableRow1{
          width: 100%;
      }
      .tableRow1 label{
          width: 20%;
          border: 1px solid black;
      }
      .tableRow1 td {
          margin-left: 10%;
          border: 1px solid rgb(185, 167, 167);
          padding: 6px;
      }
      .tableRow1 td input{
          width: 100%;
          border: none;
          padding: 6px 0px;
          font-size: 16px;
      }
      .tableRow2 td{
          margin-left: 10%;
          border: 1px solid rgb(185, 167, 167);
          padding: 6px 0px 6px 10px;
      }
      .tableRow2 td input{
          width: 100%;
          border: none;
          padding: 6px 0px;
          font-size: 16px;
      }
      .address{
          width: 99.9%;
          height: 5vh;
      }
      .aboriginal{
          width: 40%
      }
      .otherSupport{
          height: 8vh;
      }
      .ReferralForm2{
          width: 95%;
          color: rgb(94, 146, 94);
          margin: auto;
          margin-bottom: 20px;
      }
      .tableRow3 td{
          margin-left: 10%;
          border: 1px solid rgb(185, 167, 167);
          padding: 0px 0px 0px 6px;
      }
      .tableRow3 td h3{
          margin-top: 15px;
      }
      .tableRow3 td input{
          width: 100%;
          height: 14px;
          border: none;
      }
      .referel{
          height: 10vh;
      }
      .Action{
          height: 10vh;
          cursor: pointer;
      }
      .Guardian{
          height: 5vh;
      }
      th{
          border: none;
      }
      td{
          border: none;
      }
      </style>
    </head>
        <body>
          <form>
            <div>
              <div class="heading" >
                  <div class="headfieldbig">
                      <h2>REFERRAL FORM</h2>
                  </div>
                  <div class="headfield1">
                      <h2></h2>
                  </div>
                  <div class="headfield2">
                     <img src="https://lirp.cdn-website.com/bfdcd844/dms3rep/multi/opt/Moonee+Valley+Care-logo+%281%29-1920w.jpg" title="Title of image" alt="alt text here" width="200">
                  </div>
              </div>
              <div class='date_managed'>
                  <label>Referral Date: ______________</label>
                  <label>Referral Managed By: ______________</label>
              </div>
              <div class='table'>
                <table border='1' class='tablemain'>
                  
                  <tr class='table_Head'>
                      <th colspan="6">Client Details</th>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Surname</td>
                      <td colSpan='5'><input type="text"  value="${pdfData.clientSurname}"  /></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td>First Name</td>
                      <td colSpan='5'><input type="text" value='${pdfData.clientFirstname}' /></td>
                  </tr>
                  
                  <tr class='table_Head'>
                      <th colspan="6">Guardian Details (If Applicable)</th>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Surname</td>
                      <td colSpan='5'><input type="text" value='${pdfData.surname}'/></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td>First Name</td>
                      <td colSpan='5'><input type="text" value='${pdfData.firstname}' /></td>
                  </tr>
      
      
                  <tr class='table_Head'>
                      <th colspan="6">Contact Detail</th>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Home Phone</td>
                      <td><input type="text" value='${pdfData.homePhone}' /></td>
                      <td>Mobile Phone</td>
                      <td colSpan='5'><input type="text" value='${pdfData.mobilePhone}' /></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Work Phone</td>
                      <td colSpan='5'><input type="text" value='${pdfData.workphone}' /></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Email Address</td>
                      <td colSpan='5'><input type="text" value='${pdfData.email}' /></td>
                  </tr>
                  <tr class='tableRow2'>
                      <td>Address</td>
                      <td colSpan='5'><input type="text" class='address' value='${pdfData.address}' /></td>
                  </tr>
      
      
                  <tr class='table_Head'>
                      <th colspan="6">Referrer Details</th>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Name</td>
                      <td><input type="text" value='${pdfData.name}' /></td>
                      <td>Position</td>
                      <td colSpan='5'><input type="text" value='${pdfData.Position}' /></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Organisation</td>
                      <td colSpan='5'><input type="text" value='${pdfData.Organisation}' /></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Contact Details</td>
                      <td colSpan='5'><input type="text" value='${pdfData.ContactDetail}' /></td>
                  </tr>
                  <tr class='tableRow2'>
                      <td>Referrer Reason</td>
                      <td colSpan='5'><input type="text" class='address' value='${pdfData.referrerReason}' /></td>
                  </tr>
      
      
                  <tr class='table_Head'>
                      <th colspan="6">Further Client Details</th>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Country of Birth</td>
                      <td><input type="text" value='${pdfData.countryOfBirth}' /></td>
                      <td>Preferred Language</td>
                      <td colSpan='5'><input type="text" value='${pdfData.preferredLanguage}' /></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td colSpan='2'>Aboriginal or Torres Strait Islander?</td>
                      <td colSpan='5'>
                          <span class='aboriginal'><input type="text" name='1' value='${pdfData.aboriginal}' /></span>
                      </td>
                  </tr>
                  <tr class='tableRow1'>
                      <td colSpan='2'>Interpreter Required?</td>
                      <td colSpan='5'>
                          <span class='aboriginal'><input type="text" name='1' value='${pdfData.interpreter}' /></span>
                      </td>
                  </tr>
                  <tr class='tableRow1'>
                      <td class='otherSupport' colSpan='2'>Other Support Required</td>
                      <td class='otherSupport' colSpan='5'><input type="text" class='otherSupport' value='${pdfData.otherSupport}' /></td>
                  </tr>
              </table>
      
              <table border='1' class='tablemain ReferralForm2'>
                  <tr class='tableRow1'>
                      <td>Referral Form</td>
                      <td>MVC</td>
                      <td>Page 1 of 2</td>
                  </tr>
                  <tr class='tableRow1'>
                      <td>Rev.1</td>
                      <td><input type="text" /></td>
                      <td><input type="text" /></td>
                  </tr>
              </table>
      
      
              <table border='1' class='tablemain'>
                  <tr class='tableRow3'>
                      <td><h3>REFERRAL FORM</h3></td>
                      <td><input type="text" class='referel' /></td>
                  </tr>
              </table>
      
              <table border='1' class='tablemain'>
                  <tr class='table_Head'>
                      <th colSpan='4'>Action Taken / Follow Up</th>
                  </tr>
                  <tr class='tableRow1'>
                      <td colSpan='4'><input type="text" class='Action' value='${pdfData.actionTaken}' /></td>
                  </tr>
                  <tr class='table_Head'>
                      <th colSpan='4'>Client/Guardian Declaration</th>
                  </tr>
                  <tr class='tableRow1'>
                      <td colSpan='4' class='Guardian'><input type="text" class='Action' value='${pdfData.guardianDeclaration}' /></td>
                  </tr>
                  <tr class='tableRow1'>
                      <td colSpan='1'>Signature of Client/Guardian</td>
                      <td colSpan='4'>
                      
                      <img src="${pdfData.signatureImage}" title="Title of image" alt="alt text here" width="190" height="70">
                      
                      </td>
                  </tr>
      
              </table>
           </div>
            </div>
            
          
          
          </form>
        </body>
      </html>
          `;

        await page.setContent(htmlContent);

        const pdfBuffer = await page.pdf({
          format: useMessage.FILE_FORMAT,
          printBackground: true,
        });

        cloudinary.uploader
          .upload_stream({ resource_type: 'raw' }, async (error, result) => {
            if (error) {
              console.error(error);
              res
                .status(500)
                .json({ message: useMessage.CLOUDINARY_UPLOADING_ERROR });
              return;
            }

            const pdfCloudinaryPath = result.secure_url;

            user.pdfPath = pdfCloudinaryPath;

            user
              .save()
              .then((data) => {
                res.send({
                  message: useMessage.USER_CREATE,
                  user: data,
                });
              })
              .catch((err) => {
                res.status(401).json({
                  message: useMessage.USER_CREATING_ERROR,
                });
              });
          })
          .end(pdfBuffer);

        await browser.close();
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // pdfRegisterDataApi: async (req, res) => {
  //   const user = new userModel(req.body);
  //   const email = req.body.email;
  //   const signatureImageBase64 = req.body.signatureImage;
  //   // let fileName = signatureImageBase64.split(',');
  //   // const fileData = fileName[1];
  //   // fs.writeFile(
  //   //   path.join('./public/Pdf_File/', 'sign.png'),
  //   //   fileData,
  //   //   { encoding: 'base64' },
  //   //   function (err) {
  //   //     console.log('File created');
  //   //   }
  //   // );
  //   // fs.writeFileSync(signatureImageFileName, signatureImageBuffer);

  //   const pdfData = {
  //     clientSurname: req.body.clientSurname,
  //     clientFirstname: req.body.clientFirstname,
  //     surname: req.body.surname,
  //     firstname: req.body.firstname,
  //     homePhone: req.body.homePhone,
  //     mobilePhone: req.body.mobilePhone,
  //     workphone: req.body.workphone,
  //     email: req.body.email,
  //     address: req.body.address,
  //     name: req.body.name,
  //     Position: req.body.Position,
  //     Organisation: req.body.Organisation,
  //     ContactDetail: req.body.ContactDetail,
  //     referrerReason: req.body.referrerReason,
  //     countryOfBirth: req.body.countryOfBirth,
  //     preferredLanguage: req.body.preferredLanguage,
  //     aboriginal: req.body.aboriginal,
  //     interpreter: req.body.interpreter,
  //     otherSupport: req.body.otherSupport,
  //     actionTaken: req.body.actionTaken,
  //     guardianDeclaration: req.body.guardianDeclaration,
  //     signatureImage: signatureImageBase64,
  //   };

  //   try {
  //     const userExist = await userModel.findOne({
  //       email: email,
  //     });
  //     console.log('userExist', userExist);
  //     if (userExist) {
  //       res.send({
  //         message: 'User already exist',
  //         success: false,
  //       });
  //     } else {
  //       const browser = await puppeteer.launch();
  //       const page = await browser.newPage();
  //       const htmlContent = `
  //               <html>
  //               <head>
  //               <style>
  //                   *:focus {
  //                       outline: none;
  //                   }
  //                 .heading{
  //                   border: 1px solid #ccc;
  //                   width: 95%;
  //                   height: 150px;
  //                   display: flex;
  //                   margin: auto;
  //                   margin-bottom: 15px;
  //                 }
  //                 .headfieldbig{
  //                   width: 60%;
  //                   border: 1px solid #ccc;
  //                 }
  //                 .headfieldbig h2{
  //                   margin-left: 10px;
  //                   margin-top: 65px;
  //                 }
  //                 .headfield1{
  //                   width: 15%;
  //                   border: 1px solid #ccc;
  //                 }
  //                 .headfield2 img{
  //                   height: 150px;
  //                   margin-left: 20px;
  //                   margin-top: 0px;
  //                   }
  //                 .date_managed{
  //                   display: flex;
  //                   width: 93%;
  //                   margin: auto;
  //                   justify-content: space-between;
  //                   margin-bottom: 25px;
  //                 }
  //                 .table{
  //                   width: 93%;
  //                   margin: auto;
  //               }
  //               table, td, th, input{
  //                   border: 1px solid rgb(131, 126, 126);
  //                 }
  //               .tablemain {
  //                   width: 100%;
  //                   margin-bottom: 5vh;
  //                   border-collapse: collapse;
  //               }
  //               .table_Head{
  //                   background-color:rgb(220, 221, 172) ;
  //                   text-align: left;
  //                   width: 100%;
  //               }
  //               .table_Head th {
  //                   margin-left: 10px;
  //                   padding: 10px;
  //               }
  //               .tableRow1{
  //                   width: 100%;
  //               }
  //               .tableRow1 label{
  //                   width: 20%;
  //                   border: 1px solid black;
  //               }
  //               .tableRow1 td {
  //                   margin-left: 10%;
  //                   border: 1px solid rgb(185, 167, 167);
  //                   padding: 6px;
  //               }
  //               .tableRow1 td input{
  //                   width: 100%;
  //                   border: none;
  //                   padding: 6px 0px;
  //                   font-size: 16px;
  //               }
  //               .tableRow2 td{
  //                   margin-left: 10%;
  //                   border: 1px solid rgb(185, 167, 167);
  //                   padding: 6px 0px 6px 10px;
  //               }
  //               .tableRow2 td input{
  //                   width: 100%;
  //                   border: none;
  //                   padding: 6px 0px;
  //                   font-size: 16px;
  //               }
  //               .address{
  //                   width: 99.9%;
  //                   height: 5vh;
  //               }
  //               .aboriginal{
  //                   width: 40%
  //               }
  //               .otherSupport{
  //                   height: 8vh;
  //               }
  //               .ReferralForm2{
  //                   width: 95%;
  //                   color: rgb(94, 146, 94);
  //                   margin: auto;
  //                   margin-bottom: 20px;
  //               }
  //               .tableRow3 td{
  //                   margin-left: 10%;
  //                   border: 1px solid rgb(185, 167, 167);
  //                   padding: 0px 0px 0px 6px;
  //               }
  //               .tableRow3 td h3{
  //                   margin-top: 15px;
  //               }
  //               .tableRow3 td input{
  //                   width: 100%;
  //                   height: 14px;
  //                   border: none;
  //               }
  //               .referel{
  //                   height: 10vh;
  //               }
  //               .Action{
  //                   height: 10vh;
  //                   cursor: pointer;
  //               }
  //               .Guardian{
  //                   height: 5vh;
  //               }
  //               th{
  //                   border: none;
  //               }
  //               td{
  //                   border: none;
  //               }
  //               </style>
  //             </head>
  //                 <body>
  //                   <form>
  //                     <div>
  //                       <div class="heading" >
  //                           <div class="headfieldbig">
  //                               <h2>REFERRAL FORM</h2>
  //                           </div>
  //                           <div class="headfield1">
  //                               <h2></h2>
  //                           </div>
  //                           <div class="headfield2">
  //                              <img src="https://lirp.cdn-website.com/bfdcd844/dms3rep/multi/opt/Moonee+Valley+Care-logo+%281%29-1920w.jpg" title="Title of image" alt="alt text here" width="200">
  //                           </div>
  //                       </div>
  //                       <div class='date_managed'>
  //                           <label>Referral Date: ______________</label>
  //                           <label>Referral Managed By: ______________</label>
  //                       </div>
  //                       <div class='table'>
  //                         <table border='1' class='tablemain'>

  //                           <tr class='table_Head'>
  //                               <th colspan="6">Client Details</th>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Surname</td>
  //                               <td colSpan='5'><input type="text"  value="${pdfData.clientSurname}"  /></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>First Name</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.clientFirstname}' /></td>
  //                           </tr>

  //                           <tr class='table_Head'>
  //                               <th colspan="6">Guardian Details (If Applicable)</th>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Surname</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.surname}'/></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>First Name</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.firstname}' /></td>
  //                           </tr>

  //                           <tr class='table_Head'>
  //                               <th colspan="6">Contact Detail</th>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Home Phone</td>
  //                               <td><input type="text" value='${pdfData.homePhone}' /></td>
  //                               <td>Mobile Phone</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.mobilePhone}' /></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Work Phone</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.workphone}' /></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Email Address</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.email}' /></td>
  //                           </tr>
  //                           <tr class='tableRow2'>
  //                               <td>Address</td>
  //                               <td colSpan='5'><input type="text" class='address' value='${pdfData.address}' /></td>
  //                           </tr>

  //                           <tr class='table_Head'>
  //                               <th colspan="6">Referrer Details</th>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Name</td>
  //                               <td><input type="text" value='${pdfData.name}' /></td>
  //                               <td>Position</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.Position}' /></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Organisation</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.Organisation}' /></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Contact Details</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.ContactDetail}' /></td>
  //                           </tr>
  //                           <tr class='tableRow2'>
  //                               <td>Referrer Reason</td>
  //                               <td colSpan='5'><input type="text" class='address' value='${pdfData.referrerReason}' /></td>
  //                           </tr>

  //                           <tr class='table_Head'>
  //                               <th colspan="6">Further Client Details</th>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Country of Birth</td>
  //                               <td><input type="text" value='${pdfData.countryOfBirth}' /></td>
  //                               <td>Preferred Language</td>
  //                               <td colSpan='5'><input type="text" value='${pdfData.preferredLanguage}' /></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td colSpan='2'>Aboriginal or Torres Strait Islander?</td>
  //                               <td colSpan='5'>
  //                                   <span class='aboriginal'><input type="text" name='1' value='${pdfData.aboriginal}' /></span>
  //                               </td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td colSpan='2'>Interpreter Required?</td>
  //                               <td colSpan='5'>
  //                                   <span class='aboriginal'><input type="text" name='1' value='${pdfData.interpreter}' /></span>
  //                               </td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td class='otherSupport' colSpan='2'>Other Support Required</td>
  //                               <td class='otherSupport' colSpan='5'><input type="text" class='otherSupport' value='${pdfData.otherSupport}' /></td>
  //                           </tr>
  //                       </table>

  //                       <table border='1' class='tablemain ReferralForm2'>
  //                           <tr class='tableRow1'>
  //                               <td>Referral Form</td>
  //                               <td>MVC</td>
  //                               <td>Page 1 of 2</td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td>Rev.1</td>
  //                               <td><input type="text" /></td>
  //                               <td><input type="text" /></td>
  //                           </tr>
  //                       </table>

  //                       <table border='1' class='tablemain'>
  //                           <tr class='tableRow3'>
  //                               <td><h3>REFERRAL FORM</h3></td>
  //                               <td><input type="text" class='referel' /></td>
  //                           </tr>
  //                       </table>

  //                       <table border='1' class='tablemain'>
  //                           <tr class='table_Head'>
  //                               <th colSpan='4'>Action Taken / Follow Up</th>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td colSpan='4'><input type="text" class='Action' value='${pdfData.actionTaken}' /></td>
  //                           </tr>
  //                           <tr class='table_Head'>
  //                               <th colSpan='4'>Client/Guardian Declaration</th>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td colSpan='4' class='Guardian'><input type="text" class='Action' value='${pdfData.guardianDeclaration}' /></td>
  //                           </tr>
  //                           <tr class='tableRow1'>
  //                               <td colSpan='1'>Signature of Client/Guardian</td>
  //                               <td colSpan='4'>

  //                               <img src="${pdfData.signatureImage}" title="Title of image" alt="alt text here" width="190" height="70">

  //                               </td>
  //                           </tr>

  //                       </table>
  //                    </div>
  //                     </div>

  //                   </form>
  //                 </body>
  //               </html>
  //             `;

  //       await page.setContent(htmlContent);
  //       const pdfBuffer = await page.pdf({
  //         format: 'A4',
  //         printBackground: true,
  //       });

  //       // const cloudinaryResponse = cloudinary.uploader.upload_stream(
  //       //     {
  //       //       format: 'pdf',
  //       //       resource_type: 'raw',
  //       //       folder: 'pdf_folder',
  //       //       public_Id: `editable_pdf_${Date.now()}`,
  //       //       overwrite: true,
  //       //     },
  //       //     console.log('check Cloudinary----->>>',process.env.CLOUD_NAME),
  //       //     (error, result) => {
  //       //       if (error) {
  //       //           console.log('cloudaniry upload PDF error', error);
  //       //           res.status(500).send({
  //       //           message: 'Error uploading PDF to Cloudinary',
  //       //         });
  //       //       } else {
  //       //         console.log('cloudaniry upload PDF result', result);
  //       //       }
  //       //     },
  //       //     console.log('check Cloudinary--2--->>>',process.env.CLOUD_NAME),
  //       //   ).end(pdfBuffer);
  //       // user.pdfPath = await cloudinaryResponse.secure_url;

  //       const outputFile = `./public/Pdf_File/editable_pdf_img_1${Date.now()}.pdf`;
  //       const padurl = fs.writeFileSync(outputFile, pdfBuffer);
  //       user.pdfPath = outputFile;

  //       const data = await user.save();
  //       res.send({
  //         success: true,
  //         message: 'User referral form successfully uploaded!!',
  //         user: data,
  //       });
  //       await browser.close();
  //     }
  //   } catch (error) {
  //   res.status(500).send({ error: error.message });
  // }
  // },

  create: async (req, res) => {
    const { password, cpPassword, referralId } = req.body;
    const user = new registerModel(req.body);

    try {
      if (password == cpPassword) {
        const userExist = await registerModel.findOne({
          email: req.body.email,
        });
        const hashPassword = await bcrypt.hash(password, 10);
        if (userExist) {
          res.status(401).json({
            message: useMessage.ALREADY_EXIT,
            success: false,
          });
        } else {
          user.role = 'user';
          user.referralId = referralId;
          user.password = hashPassword;
          const data = await user.save();
          res.send({
            success: true,
            message: useMessage.USER_CREATE,
            user: data,
          });
        }
      } else {
        res.status(401).json({
          message: useMessage.PASSWORD_CONFIRMPASSWORD,
          success: false,
        });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const findUser = await registerModel.findOne({ email: email });
        if (findUser) {
          bcrypt.compare(
            password,
            findUser.password,
            async function (err, result) {
              if (err) throw err;
              else if (result) {
                const token = jwt.sign(
                  { email: findUser.email },
                  process.env.PRIVATE_KEY,
                  { expiresIn: '20m', algorithm: 'HS256' }
                );
                const userUpdate = await registerModel.updateOne(
                  { email: email },
                  { $set: { token: token } },
                  { new: true }
                );
                if (userUpdate) {
                  res.send({
                    message: useMessage.USER_LOGIN,
                    user: findUser,
                    role: findUser.role,
                    token: token,
                    success: true,
                  });
                }
              } else {
                res
                  .status(401)
                  .json({ message: useMessage.INVALID_PASSWORD, success: false });
              }
            }
          );
        } else {
          res.status(401).json({
            message: useMessage.INVALID_EMAIL,
            success: false,
          });
        }
      } else {
        res.status(401).json({
          message: useMessage.ENTER_EMAIL_PASSWORD,
          success: false,
        });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const users = await registerModel.find({ role: 'user' }).populate({
        path: 'referralId',
        select: 'pdfPath-_id',
      });

      if (users?.length > 0) {
        res.send({
          success: true,
          message: useMessage.FINDALL_USER,
          user: users,
        });
      } else {
        res.send({
          success: false,
          message: useMessage.USER_DOES_NOT,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  specificUser: async (req, res) => {
    try {
      const email = req.params.email;
      const user = await registerModel.findOne({ email: email }).populate({
        path: 'referralId',
        select: 'pdfPath-_id',
      });
      // const specificUserData = await user.findOne({ email });
      if (user) {
        res.send({
          message: useMessage.FIND_ONE_USER,
          success: true,
          user_data: user,
        });
      } else {
        res.status(401).send({
          message: useMessage.USER_DOES_NOT,
          success: false,
        });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  forgetPasswordApi: async (req, res) => {
    const { email } = req.body;
    // const user = new registerModel(req.body);
    // console.log('resetPassword email',process.env.EMAIL);
    try {
      if (email) {
        const findUser = await registerModel.findOne({ email: email });
        const token = jwt.sign({ email: findUser.email }, process.env.PRIVATE_KEY, {
          expiresIn: '10m',
          algorithm: 'HS256',
        });
        const userUpdate = await registerModel.updateOne(
          { email: email },
          { $set: { passwordResetToken: token } },
          { new: true }
        );

        if (userUpdate) {
          const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });
          const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: `${email}`,
            subject: 'resetPassword liNK ✔',
            text: `<b>Send email Pease check your email</b>`,
            html: ` please reset your password by clicking on this link <a href=${`http://localhost:3000/reset-password/${token}`}> Click here  <a>and this  link valid for 10 minute.`,
          });

          // registerModel.passwordResetToken = token;
          // const data = await registerModel.save();
          res.send({
            message: useMessage.CHECK_EMAIL,
            success: true,
            passwordResetToken: token,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    const { passwordResetToken } = req.params;
    const { password, cpPassword } = req.body;
    try {
      if (passwordResetToken) {
        const findUser = await registerModel.findOne({
          passwordResetToken: passwordResetToken,
        });
        if (password === cpPassword) {
          const hashPassword = await bcrypt.hash(password, 10);
          const updatePassword = await registerModel.updateOne(
            { passwordResetToken: passwordResetToken },
            { $set: { password: hashPassword, cpPassword: cpPassword } }
          );
          if (updatePassword) {
            res.send({
              success: true,
              message: useMessage.PASSWORD_CHANGE,
            });

            const transporter = nodemailer.createTransport({
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
              },
            });
            const info = await transporter.sendMail({
              from: process.env.EMAIL,
              to: `${findUser.email}`,
              subject: 'password changed ✔',
              text: `<b>Send email Pease check your email</b>`,
              html: ` your password is successfully change, your new password:  ${cpPassword} `,
            });
          }
        } else {
          res.status(401).json({
            message: useMessage.PASSWORD_CONFIRMPASSWORD,
            success: false,
          });
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
