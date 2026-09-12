# Google Sheets Integration Guide for Finlogue Coordinators

This guide explains how to connect your **Finlogue Website** to a **Google Sheet** in your LNMIIT Google Drive so that:
1. **Event Registrations & Inquiries** are automatically recorded in real-time.
2. **Events added or toggled (Live / Upcoming / Archived)** in the Admin Portal are stored in the Sheet.

---

## Step 1: Create the Google Sheet (1 minute)

1. Open your LNMIIT Google Drive ([drive.google.com](https://drive.google.com)) and create a new **Google Sheet**.
2. Name the sheet: **`Finlogue Database`**.
3. Create 3 tabs at the bottom by clicking the `+` button:
   - **`Registrations`**
   - **`Inquiries`**
   - **`Events`**

---

## Step 2: Add Header Rows to Each Tab

- In the **`Registrations`** tab, add these headers in row 1:
  `Timestamp` | `Token` | `Event` | `Name` | `Email` | `Institution` | `Statement`

- In the **`Inquiries`** tab, add these headers in row 1:
  `Timestamp` | `Ticket ID` | `Name` | `Email` | `Organization` | `Inquiry Type` | `Message`

- In the **`Events`** tab, add these headers in row 1:
  `ID` | `File Number` | `Title` | `Status` | `Category` | `Date` | `Description` | `Prize` | `Eligibility`

---

## Step 3: Add the Google Apps Script Webhook (2 minutes)

1. In your Google Sheet, click on the top menu: **Extensions → Apps Script**.
2. Delete any default code in the editor, and paste the following script:

```javascript
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "getEvents";
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (action === "getEvents") {
    var sheet = ss.getSheetByName("Events");
    if (!sheet) {
      return jsonResponse({ success: true, events: [] });
    }
    var rows = sheet.getDataRange().getValues();
    var events = [];
    for (var i = 1; i < rows.length; i++) {
      if (!rows[i][0] && !rows[i][2]) continue;
      events.push({
        id: String(rows[i][0]),
        fileNumber: String(rows[i][1]),
        title: String(rows[i][2]),
        status: String(rows[i][3]),
        category: String(rows[i][4]),
        date: String(rows[i][5]),
        description: String(rows[i][6]),
        prizeOrOutput: String(rows[i][7]),
        eligibility: String(rows[i][8])
      });
    }
    return jsonResponse({ success: true, events: events });
  }

  return jsonResponse({ success: true, message: "Finlogue Webhook Active" });
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. EVENT REGISTRATIONS & PI SUBMISSIONS
    if (action === "register" || data.rollNumber) {
      var sheet = ss.getSheetByName("Registrations") || ss.getActiveSheet();
      sheet.appendRow([
        data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.name || "",
        data.rollNumber || "",
        data.email || "",
        data.phone || "",
        data.statement || ""
      ]);

      // AUTOMATED CONFIRMATION EMAIL WITH STUDY MATERIAL
      if (data.email) {
        try {
          var applicantName = data.name || "Candidate";
          var applicantRoll = data.rollNumber || "";
          var subject = "Finlogue LNMIIT | PI Interview Confirmation & Study Material";

          // OPTION A: Google Drive Public Link to the Study Material
          var STUDY_MATERIAL_LINK = "https://drive.google.com/drive/folders/YOUR_DRIVE_FOLDER_OR_FILE_LINK";

          // OPTION B (Optional): Attach actual PDF from Google Drive
          // Replace 'PASTE_DRIVE_FILE_ID_HERE' with your file's ID from Google Drive URL
          // e.g. drive.google.com/file/d/1a2b3c.../view -> ID is 1a2b3c...
          var DRIVE_FILE_ID = ""; // Leave blank if using link only

          var attachments = [];
          if (DRIVE_FILE_ID && DRIVE_FILE_ID !== "PASTE_DRIVE_FILE_ID_HERE") {
            try {
              var file = DriveApp.getFileById(DRIVE_FILE_ID);
              attachments.push(file.getAs(MimeType.PDF));
            } catch (fileErr) {
              Logger.log("Attachment error: " + fileErr);
            }
          }

          var htmlBody = 
            "<div style='font-family: Arial, sans-serif; color: #0A1329; max-width: 600px; margin: 0 auto; line-height: 1.6;'>" +
              "<div style='background-color: #070D1E; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;'>" +
                "<h2 style='color: #C5A880; margin: 0; font-family: Georgia, serif; letter-spacing: 1.5px;'>FINLOGUE LNMIIT</h2>" +
                "<p style='color: #E2E8F0; margin: 6px 0 0; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px;'>Finance & Investment Society</p>" +
              "</div>" +
              "<div style='padding: 26px 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 8px 8px; background-color: #FFFFFF;'>" +
                "<p style='font-size: 15px;'>Dear <strong>" + applicantName + "</strong>" + (applicantRoll ? " (" + applicantRoll + ")" : "") + ",</p>" +
                "<p style='font-size: 14px;'>Your application for the <strong>Finlogue Personal Interview (PI) Round (Y26 Cohort)</strong> has been successfully received.</p>" +
                "<div style='background-color: #F8FAFC; border-left: 4px solid #C5A880; padding: 16px 18px; margin: 22px 0; border-radius: 0 6px 6px 0;'>" +
                  "<p style='margin: 0; font-size: 14.5px; font-weight: bold; color: #070D1E;'>PI Preparation Dossier & Study Material:</p>" +
                  "<p style='margin: 8px 0 14px; font-size: 13.5px; color: #334155;'>To help you prepare effectively for the interview rounds, please review the preparatory material attached / linked below before reporting for your interview:</p>" +
                  "<p style='margin: 0;'><a href='" + STUDY_MATERIAL_LINK + "' style='background-color: #070D1E; color: #C5A880; padding: 11px 22px; text-decoration: none; border-radius: 6px; font-size: 13.5px; font-weight: bold; display: inline-block;'>Access PI Study Material →</a></p>" +
                "</div>" +
                "<p style='font-size: 13.5px; color: #334155;'>Please carry your student ID card and report at your allocated venue and time slot (which will be communicated via official college channels & WhatsApp).</p>" +
                "<hr style='border: none; border-top: 1px solid #E2E8F0; margin: 24px 0;' />" +
                "<p style='font-size: 12px; color: #64748B; margin: 0;'>Warm regards,<br /><strong style='color: #070D1E;'>Steering Council & Recruitment Team</strong><br />Finlogue — The Finance Society of LNMIIT<br />Official Mail: <a href='mailto:finlogue@licai.lnmiit.ac.in' style='color: #C5A880;'>finlogue@licai.lnmiit.ac.in</a></p>" +
              "</div>" +
            "</div>";

          var emailOptions = {
            htmlBody: htmlBody,
            name: "Finlogue LNMIIT"
          };
          if (attachments.length > 0) {
            emailOptions.attachments = attachments;
          }

          MailApp.sendEmail(data.email, subject, "Please view this email in an HTML compatible client.", emailOptions);
        } catch (mailErr) {
          Logger.log("Automated email dispatch error: " + mailErr);
        }
      }

      return jsonResponse({ success: true, message: "Registration recorded & study material email dispatched" });
    }

    // 2. CONTACT INQUIRIES
    if (action === "contact") {
      var sheet = ss.getSheetByName("Inquiries") || ss.insertSheet("Inquiries");
      sheet.appendRow([
        new Date().toISOString(),
        data.ticketId || "",
        data.name || "",
        data.email || "",
        data.organization || "",
        data.inquiryType || "",
        data.message || ""
      ]);
      return jsonResponse({ success: true, message: "Inquiry recorded" });
    }

    // 3. ADD OR UPDATE EVENT
    if (action === "saveEvent") {
      var sheet = ss.getSheetByName("Events") || ss.insertSheet("Events");
      var rows = sheet.getDataRange().getValues();
      var event = data.event;
      var foundRow = -1;

      for (var i = 1; i < rows.length; i++) {
        if (rows[i][0] === event.id) {
          foundRow = i + 1;
          break;
        }
      }

      var rowData = [
        event.id,
        event.fileNumber,
        event.title,
        event.status,
        event.category,
        event.date,
        event.description,
        event.prizeOrOutput,
        event.eligibility
      ];

      if (foundRow > 0) {
        sheet.getRange(foundRow, 1, 1, rowData.length).setValues([rowData]);
      } else {
        sheet.appendRow(rowData);
      }
      return jsonResponse({ success: true, message: "Event saved" });
    }

    // 4. TOGGLE EVENT STATUS (ACTIVE / UPCOMING / CLOSED)
    if (action === "updateStatus") {
      var sheet = ss.getSheetByName("Events");
      if (!sheet) return jsonResponse({ success: false, error: "Events sheet missing" });
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][0] === data.id) {
          sheet.getRange(i + 1, 4).setValue(data.status);
          return jsonResponse({ success: true, message: "Status updated to " + data.status });
        }
      }
      return jsonResponse({ success: false, error: "Event ID not found" });
    }

    // 5. DELETE EVENT
    if (action === "deleteEvent") {
      var sheet = ss.getSheetByName("Events");
      if (!sheet) return jsonResponse({ success: false, error: "Events sheet missing" });
      var rows = sheet.getDataRange().getValues();
      for (var i = 1; i < rows.length; i++) {
        if (rows[i][0] === data.id) {
          sheet.deleteRow(i + 1);
          return jsonResponse({ success: true, message: "Event deleted" });
        }
      }
      return jsonResponse({ success: false, error: "Event ID not found" });
    }

    return jsonResponse({ success: false, error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 4: Deploy the Webhook URL

1. In the top right corner of Apps Script, click **Deploy → New deployment**.
2. Click the gear icon (`⚙️`) next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `Finlogue API Webhook`
   - **Execute as**: `Me` (your account)
   - **Who has access**: `Anyone` *(Important: required so the website server can submit form entries)*
4. Click **Deploy**.
5. Copy the **Web App URL** (it looks like: `https://script.google.com/macros/s/AKfycbx.../exec`).

---

## Step 5: Add Web App URL to Netlify

1. Go to your [Netlify Dashboard](https://app.netlify.com/) → Select your site (`boisterous-sprinkles-3ecc16`).
2. Go to **Site Configuration → Environment variables**.
3. Add a new variable:
   - **Key**: `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: *(Paste your Web App URL from Step 4)*
4. (Optional) Add your desired coordinator passkey:
   - **Key**: `ADMIN_PASSKEY`
   - **Value**: `FINLOGUE@LNMIIT2026` *(or any password you choose)*
5. Click **Save**.

That's it! Every registration, inquiry, and event added or toggled via the Admin Portal will sync directly with your Google Sheet!
