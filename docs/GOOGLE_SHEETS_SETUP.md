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

    // 1. EVENT REGISTRATIONS
    if (action === "register") {
      var sheet = ss.getSheetByName("Registrations") || ss.insertSheet("Registrations");
      sheet.appendRow([
        new Date().toISOString(),
        data.token || "",
        data.eventTitle || "",
        data.name || "",
        data.email || "",
        data.institution || "",
        data.statement || ""
      ]);
      return jsonResponse({ success: true, message: "Registration recorded" });
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
