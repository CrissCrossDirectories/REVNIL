# **The 2026 Collegiate Athletics Landscape: Structural Transformation, Regulatory Compliance, and Commercialization Opportunities**

## **1\. Executive Overview: The Post-Settlement Paradigm**

The collegiate athletics ecosystem of 2026 bears little resemblance to the amateur model that governed the National Collegiate Athletic Association (NCAA) for the preceding century. Following the landmark *House v. NCAA* settlement, finalized in June 2025, the industry has undergone a radical restructuring that has professionalized the relationship between institutions and student-athletes.1 This transformation has transitioned the sector from a regulated amateurism model to a complex, semi-professional labor market characterized by direct revenue sharing, centralized enforcement, and a bifurcated compensation structure involving both institutional payroll and third-party commercial activity.

The settlement introduced a fundamental economic shift: Division I institutions are now permitted—and competitively compelled—to share approximately $20.5 million to $22 million annually directly with student-athletes.3 This revenue-sharing cap, derived from 22% of the average Power 5 media rights and ticket revenue, operates alongside the existing Name, Image, and Likeness (NIL) economy, creating a hybrid financial model. Student-athletes now function simultaneously as W-2 employees of the university (for revenue share payments) and 1099 independent contractors (for third-party NIL deals).5

This report provides an exhaustive analysis of this new operating environment. It dissects the regulatory architecture enforced by the newly established College Sports Commission (CSC) and its twin technological pillars: **NIL Go** (for third-party deal clearance) and **CAPS** (College Athlete Payment System, for institutional cap management). It further examines the operational realities for key stakeholders—university athletic departments, collectives, agents, and athletes—who must navigate a landscape fraught with compliance pitfalls, tax complexities, and Title IX liabilities.

Finally, this report identifies a significant market gap for enterprise-grade technology solutions. As athletic departments transform into professional front offices, they currently lack the integrated "General Manager" platforms necessary to manage roster valuation, salary cap allocation, and multi-stream compliance. We present a detailed commercialization roadmap for an AI-driven **Roster Operating System (ROS)**, outlining specific product requirements, technical architecture, and integration strategies to service this multi-billion dollar industry.

## ---

**2\. The Regulatory Architecture: From Wild West to Centralized Enforcement**

The chaotic early era of NIL (2021–2024), often characterized as the "Wild West," has been replaced by a rigorous, centralized enforcement regime. The *House* settlement did not merely authorize payments; it mandated the creation of a bureaucracy to police the economic integrity of the system. The enforcement philosophy has shifted from procedural compliance to substantive economic review, focusing on the legitimacy of transactions and the prevention of "pay-for-play" inducements disguised as marketing deals.

### **2.1 The College Sports Commission (CSC)**

The College Sports Commission (CSC) serves as the primary regulatory body for the post-House era, operating independently of the NCAA’s traditional enforcement staff. Its mandate is specific: to oversee the integrity of the revenue-sharing model and third-party NIL markets.6 The CSC is empowered to investigate rule violations, adjudicate disputes, and administer penalties for non-compliance.

Unlike previous enforcement efforts which were often hamstrung by antitrust concerns, the CSC operates under the legal shelter of the *House* settlement terms, giving it broader authority to assess the "Fair Market Value" (FMV) of deals. By early 2026, the CSC had already demonstrated its aggressive stance by rejecting over 500 third-party deals totaling nearly $15 million, creating an immediate chilling effect on the "sham" collective market.8

### **2.2 NIL Go: The Third-Party Clearinghouse**

**NIL Go** is the mandatory technology platform for all Division I student-athletes engaging in third-party NIL activities. Developed in partnership with Deloitte, NIL Go acts as the central clearinghouse for deal eligibility.7

#### **2.2.1 Reporting Mandates and Thresholds**

All third-party deals valued at **$600 or more** must be reported to NIL Go. Crucially, this threshold applies to the *aggregate* value of deals from a single source over an academic year. If a local business provides three separate payments of $250, the third payment triggers the reporting requirement for the entire sum. This aggregation rule is designed to prevent structuring payments to evade scrutiny.10

#### **2.2.2 The "Valid Business Purpose" (VBP) Test**

The core function of NIL Go is to subject every submitted deal to a "Valid Business Purpose" (VBP) test. The system utilizes a combination of algorithmic filtering and manual review to determine if the transaction represents a genuine commercial exchange.

* **Commercial Exchange:** The deal must involve a *quid pro quo* where the athlete provides tangible deliverables (e.g., social media posts, autograph sessions, commercial appearances) that benefit the payor’s business.  
* **Proof of Activation:** Contracts that pay athletes for "goodwill" or "brand ambassadorship" without specific, trackable deliverables are flagged for rejection. The CSC has explicitly warned that agreements with associated entities (collectives/boosters) must include "direct activation" of rights.8  
* **Payor Association:** The system identifies if the payor is an "Associated Entity" (e.g., a booster collective). Deals involving Associated Entities face heightened scrutiny to ensure they are not disguised retention bonuses.11

#### **2.2.3 Range of Compensation (ROC) Analysis**

Beyond VBP, NIL Go evaluates the "Range of Compensation" (ROC) to ensure payments are commensurate with Fair Market Value.

* **Algorithmic Benchmarking:** The system compares the proposed compensation against a database of similar deals for athletes of comparable stature (sport, conference, social media following).  
* **Outlier Detection:** If a backup lineman with 500 Instagram followers receives a $50,000 offer for a single post, the system flags the deal as an outlier. Unless the payor can justify this valuation with specific ROI projections, the deal is likely to be rejected as a disguised inducement.11

### **2.3 CAPS: The Institutional Ledger**

While NIL Go polices the third-party market, the **College Athlete Payment System (CAPS)** polices the universities. Developed with LBi Software, CAPS serves as the centralized ledger for tracking the institutional revenue-sharing cap.12

#### **2.3.1 Cap Calculation and Allocation**

For the 2025–2026 academic year, the revenue-sharing cap is set at approximately **$20.5 million** per institution. CAPS is the system of record for tracking how this money is spent.

* **Revenue Share Payments:** Direct cash payments to athletes are the primary line item.  
* **Offset Mechanisms:** The system tracks permissible offsets, such as Alston academic awards (up to \~$5,980 per athlete) and scholarships that exceed the pre-settlement limits. These amounts must be carefully categorized to ensure they do not inadvertently count against the cap or, conversely, are used to circumvent it.12

#### **2.3.2 Roster Limit Enforcement**

The *House* settlement eliminated scholarship limits in favor of roster limits (e.g., 105 players for football, up from the previous 85-scholarship limit). CAPS tracks the total number of athletes receiving revenue share to ensure compliance with these new roster density rules.1

| Feature | NIL Go | CAPS |
| :---- | :---- | :---- |
| **Primary User** | Student-Athletes, Agents | University Administrators |
| **Developer** | Deloitte | LBi Software |
| **Scope** | Third-Party NIL Deals | Institutional Revenue Sharing |
| **Key Metric** | Valid Business Purpose (VBP) | $20.5M Annual Cap |
| **Enforcement** | Rejection of non-compliant deals | Penalties for cap overage |
| **Threshold** | \>$600 (Aggregate) | All institutional payments |

## ---

**3\. Stakeholder Analysis: Operational Realities and Friction Points**

The transition to this new regulatory framework has fundamentally altered the daily operations of all stakeholders. The following section details the specific workflows, challenges, and evolving roles of universities, collectives, and athletes.

### **3.1 University Athletic Departments: The "General Manager" Era**

University athletic departments have effectively transformed into professional sports franchises. The traditional administrative structure, focused on compliance and academics, has been superseded by a "Front Office" model centered on talent acquisition, retention, and salary cap management. This has given rise to the **General Manager (GM)** as the most critical executive role outside the Athletic Director.14

#### **3.1.1 The Roster Valuation Crisis**

The primary challenge for the modern GM is the allocation of the $20.5 million cap. Unlike professional leagues where salary caps are significantly higher ($255M in the NFL), the collegiate cap is relatively small compared to the roster size (105 players in football alone, plus basketball, baseball, etc.).

* **Zero-Sum Economics:** Every dollar allocated to a quarterback is a dollar removed from the defensive line or women's basketball. GMs must develop sophisticated valuation models (Wins Above Replacement, Revenue Generation Impact) to determine the "efficient price" for talent.  
* **The "Moneyball" Problem:** Without centralized data on what other schools are paying (as salaries are not yet fully public like in the pros), GMs are operating in a market with high information asymmetry. They rely on fragmented data points from agents and collectives to estimate the market rate for a "starting SEC left tackle."

#### **3.1.2 Title IX and Liability Management**

The distribution of the $20.5 million cap creates massive legal exposure under Title IX. The *House* settlement’s backpay formula allocated 90% of funds to football and men’s basketball, reflecting their revenue generation. However, future revenue sharing must comply with Title IX’s requirement for equitable benefits.15

* **The "Two-Tier" Strategy:** To mitigate risk, many departments are adopting a "Two-Tier" compensation model.  
  * *Tier 1 (Base):* A uniform baseline payment available to all athletes (e.g., $10,000 per athlete).  
  * *Tier 2 (Market):* Additional "performance" or "royalty" payments based on the commercial value of the athlete (media rights value, jersey sales). Universities argue this disparity is based on non-discriminatory market factors, though this legal theory faces active challenges in the Ninth Circuit.16  
* **The Proportionality Trap:** If a school spends $18 million on men’s sports and $2.5 million on women’s sports, they invite federal investigation. GMs currently lack software that models the Title IX impact of every roster move in real-time.

#### **3.1.3 The "Institutional Knowledge" Burden**

Under the new CSC rules, universities have an "affirmative duty" to report non-compliant third-party deals they become aware of. The concept of "plausible deniability" is dead. If a football coach knows that a collective promised a recruit $100,000 for a "no-show" job, the university is liable for failure to report. This forces the GM to monitor not just the internal payroll (CAPS) but also the external collective activity (NIL Go), bridging the gap between two disparate systems.6

### **3.2 The Third-Party Ecosystem: Collectives and Agents**

#### **3.2.1 Collectives: Pivot or Perish**

In the pre-2025 era, collectives were essentially fundraising vehicles that pooled donor money to pay athletes. The "Valid Business Purpose" (VBP) requirement of NIL Go poses an existential threat to this model.

* **The Agency Shift:** To survive deal rejections, collectives are pivoting to become legitimate sports marketing agencies. Instead of soliciting donations for a "general fund," they are brokering deals with local businesses (car dealerships, HVAC companies) where the athlete performs actual work.  
* **Operational Burden:** This shift requires a massive increase in operational overhead. Collectives must now track deliverables (e.g., did the athlete show up to the autograph signing?) to provide the "Proof of Activation" required by NIL Go audits. The "bag man" has been replaced by the Account Executive.11

#### **3.2.2 Agents: The Compliance Gatekeepers**

Agents have become the primary power users of the NIL Go platform. Their role has expanded from contract negotiation to compliance management.

* **Liability:** Agents face decertification if they negotiate deals that are repeatedly rejected by the CSC. They serve as the first line of defense, filtering out "sham" offers before they reach the clearinghouse.  
* **Workflow:** The agent is responsible for the administrative task of uploading contracts, managing disputes, and filing appeals through the neutral arbitration system if a deal is rejected.7

### **3.3 The Student-Athlete: The Hybrid Earner**

The student-athlete of 2026 faces a financial reality more complex than most professional athletes.

#### **3.3.1 The Hybrid Tax Status**

Athletes now manage two distinct tax identities:

1. **W-2 Employee:** For the revenue share payments from the university. The university withholds federal, state, and FICA taxes automatically.5  
2. **1099 Contractor:** For third-party NIL deals. The athlete receives the gross amount and is responsible for quarterly estimated tax payments.

#### **3.3.2 The "Tax Bracket Trap"**

The W-2 income from the university can push the athlete into a higher marginal tax bracket, increasing the tax liability on their 1099 NIL income. A freshman receiving a $50,000 revenue share and $20,000 in NIL might find their tax bill significantly higher than anticipated. Without sophisticated financial planning, many athletes risk severe tax delinquency.5

## ---

**4\. Operational Process Deep Dive**

To identify commercialization opportunities, we must first understand the granular workflows of the current ecosystem.

### **4.1 The Deal Clearance Workflow (NIL Go)**

The process of clearing a third-party NIL deal follows a strict sequential path:

1. **Submission:** The athlete or agent logs into NIL Go and inputs deal metadata: Counterparty Name, Deal Value, Duration, and Scope of Work. They upload the PDF contract.  
2. **Automated VBP Screening:** The system uses Natural Language Processing (NLP) to scan the contract for keywords indicating commercial deliverables (e.g., "post," "appearance," "license"). It flags "passive" language (e.g., "goodwill," "support").  
3. **Fair Market Value (FMV) Check:** The system checks the compensation against the ROC database.  
   * *Scenario:* An SEC Quarterback deal for $100k is compared against the median for SEC QBs. If within 1 standard deviation, it passes.  
4. **Payor Vetting:** The system cross-references the payor against a list of known "Associated Entities" (boosters). If the payor is a known booster, the deal is flagged for manual review.  
5. **Determination:**  
   * *Cleared:* Funds can be released.  
   * *Flagged:* Request for additional information (e.g., "Provide proof of event").  
   * *Rejected:* Deal violates VBP or ROC.  
6. **Arbitration:** If rejected, the agent can file a "Form Demand for Arbitration" within 14 days. A neutral arbitrator reviews the case, independent of the CSC.19

### **4.2 The Institutional Payroll Workflow (CAPS)**

The university GM manages the internal payroll through a different loop:

1. **Roster Allocation:** The GM inputs the proposed roster for the upcoming academic year into CAPS.  
2. **Cap Simulation:** The GM assigns tentative revenue share amounts to each player. CAPS aggregates these amounts, adds the projected Alston awards ($5,980/player), and checks against the $20.5M cap.  
3. **Optimization:** The GM adjusts allocations to fit the cap. (e.g., "We are $200k over. Reduce the Freshman class base pay by 5%").  
4. **Payroll Integration:** Once finalized, CAPS exports the data to the university’s HR system (e.g., Workday) to generate W-2s and schedule bi-weekly direct deposits.  
5. **Reporting:** CAPS generates the compliance report submitted to the CSC at the end of the fiscal year.12

## ---

**5\. Commercialization Opportunities: The "Roster Operating System" (ROS)**

The current market utilizes fragmented tools: CAPS for compliance, NIL Go for clearance, Opendorse/Teamworks for brand management, and spreadsheets for valuation. There is a massive unmet need for a **Unified Roster Operating System (ROS)**—an enterprise-grade platform that serves as the "ERP for College Sports."

This section outlines the Product Requirements Document (PRD) for a solution that addresses the needs of Universities, Collectives, and Agents.

### **5.1 Core Product: The University "General Manager" Platform**

**Product Concept:** *Athena GM*

**Target User:** Athletic Director, General Manager, CFO of Athletics.

Current solutions like Teamworks are pivoting to this, but a dedicated, purpose-built financial instrument is required.

#### **Module 1: Algorithmic Roster Valuation Engine ("Moneyball AI")**

* **Gap:** GMs guess at player value. They need data.  
* **Feature:** An AI model that ingests on-field performance data (PFF grades, EPA), social media metrics (Engagement Rate), and transfer portal market data to output a specific "Fair Market Value" range for every player.  
* **Technical Requirement:** Integration with Telemetry Sports (for stats) and scraped public NIL data. The model must provide a "Wins Per Dollar" metric.  
* **User Story:** "As a GM, I want to know if paying Transfer Quarterback X $1.5M will generate more wins than signing three defensive linemen at $500k each."

#### **Module 2: Integrated Cap & Title IX Ledger**

* **Gap:** CAPS tracks the *limit*, but not the *strategy*. Title IX compliance is often a retrospective audit, not a proactive guardrail.  
* **Feature:** A real-time ledger that simulates the Title IX impact of every roster move.  
* **Functionality:**  
  * *Scenario Builder:* Drag-and-drop interface to test roster changes. "If we cut Player A, does our female proportionality drop below the safe harbor?"  
  * *Alert System:* "Warning: Proposed allocation to Football exceeds 85% of total cap. Title IX Risk: High."  
  * *Tax Calculator:* Auto-calculates the "Employer Burden" (payroll taxes) on top of the $20.5M cap to give the CFO a true cost of roster.

#### **Module 3: The "Institutional Knowledge" Risk Dashboard**

* **Gap:** Universities are liable for collective activity they "know" about, but data is siloed.  
* **Feature:** A "Shadow Ledger" that imports cleared deal data from NIL Go (via API or agent reporting) to show the *Total Compensation* (Rev Share \+ NIL) of every athlete.  
* **Functionality:**  
  * *Risk Scoring:* "Player Z has $50k in pending deals from a high-risk booster. Flag for compliance review."  
  * *Recruiting Intelligence:* "Recruit A has a verified $200k offer from a competitor collective (based on market intel). We need to match with Rev Share."

### **5.2 Expansion Product: The Collective Operating System**

**Product Concept:** *AgencyOS*

**Target User:** Collective Executives, Account Managers.

#### **Module 1: Automated "Proof of Activation"**

* **Gap:** Collectives struggle to prove VBP to the CSC.  
* **Feature:** A mobile app for athletes that geo-verifies their attendance at events and scrapes their social media for required posts.  
* **Functionality:**  
  * *Geo-Fencing:* "Check in" at the autograph signing to release payment.  
  * *Social Listening:* API connection to Instagram/TikTok to verify the "Sponsored" post is live and compliant with brand guidelines.  
  * *Report Generation:* One-click export of a "Compliance Packet" (PDF) formatted specifically for NIL Go audits.

#### **Module 2: CRM for Donor-to-Brand Conversion**

* **Gap:** Collectives need to convert donors into business partners.  
* **Feature:** A CRM that matches donor businesses with athletes based on demographics.  
* **Functionality:** "Donor X owns a car dealership. Athlete Y has 50% of followers in that zip code. Suggested Deal: $5k/month for 2 posts."

### **5.3 Expansion Product: The Athlete Wealth Management Stack**

**Product Concept:** *ProFit Athlete*

**Target User:** Student-Athletes, Agents, Parents.

#### **Module 1: The "Hybrid" Tax Engine**

* **Gap:** Athletes underestimate tax liabilities on 1099 income because they see W-2 withholding and assume they are covered.  
* **Feature:** A real-time "Net Income" dashboard.  
* **Functionality:**  
  * Connects to University Payroll (W-2) and Collective payouts (1099).  
  * Calculates the marginal tax rate based on *combined* income.  
  * *Auto-Save:* Automatically moves the required % of every 1099 deposit into a high-yield "Tax Reserve" savings account.

#### **Module 2: The Deal Submission Bot**

* **Gap:** Manual data entry into NIL Go is tedious and error-prone.  
* **Feature:** Agentic AI for contract processing.  
* **Functionality:**  
  * *Upload:* Athlete photographs a paper contract or uploads a PDF.  
  * *Parse:* AI (LLM) extracts Counterparty, Amount, Date, Deliverables.  
  * *Submit:* Bot logs into NIL Go via API (or browser automation) and files the report.  
  * *VBP Pre-Check:* The AI analyzes the contract *before* submission and warns: "This contract lacks specific deliverables and has a 90% chance of rejection by CSC. Add a 'social post' clause to improve approval odds."

## ---

**6\. Advanced Technology Architecture: AI Implementation**

To deliver these solutions, the underlying technology stack must leverage specific AI capabilities that go beyond simple data aggregation.

### **6.1 Agentic AI Workflows for Contract Analysis**

The "VBP Pre-Check" feature requires a Multi-Agent System (MAS) architecture.20

* **Agent A (The Legal Analyst):** An LLM fine-tuned on contract law scans the document for "Pay-for-Play" triggers (e.g., "retainer," "bonus for enrollment").  
* **Agent B (The Market Analyst):** Queries the proprietary database of cleared deals to establish the "Fair Market Value" baseline for this specific athlete profile.  
* **Agent C (The Synthesizer):** Combines the legal risk (Agent A) and valuation risk (Agent B) to generate a "Clearance Confidence Score."

### **6.2 Predictive Modeling for Transfer Portal Valuation**

The "Moneyball" engine requires predictive modeling similar to the **SSPAIN.ai** framework developed for sponsorship retention.22

* **Survival Analysis:** Used to predict the probability of a player entering the transfer portal based on playing time, team win %, and coaching changes.  
* **Projected Value (PV) Model:**  
  ![][image1]  
  * *WinShare:* Projected on-field contribution (Telemetry Sports data).  
  * *UnitValue:* The dollar value of a "Win" to that specific university (Ticket Sales \+ Media Rights).  
  * *BrandValue:* The athlete's standalone marketing value.  
  * *MediaMultiplier:* The program's platform effect (e.g., SEC visibility vs. MAC visibility).

## ---

**7\. Future Outlook and Strategic Recommendations**

The 2026 landscape is not the end state; it is a transitional phase toward full professionalization.

### **7.1 The Inevitability of Collective Bargaining**

The current system relies on the *House* settlement to enforce caps. However, legal challenges regarding "wage fixing" persist. The only permanent legal shield against antitrust litigation is a Collective Bargaining Agreement (CBA).

* **Prediction:** By 2028, athletes will likely unionize (likely by conference), and the "cap" will be negotiated rather than imposed by settlement.  
* **Tech Implication:** The "General Manager" platforms built today must be adaptable to support union dues, pension contributions, and standard player contracts in the future.

### **7.2 The Private Equity Influx**

As universities struggle to fund the $20.5M cap, Private Equity (PE) firms are entering the space to purchase stakes in media rights or commercial arms of athletic departments.

* **Tech Implication:** PE firms demand rigorous financial reporting. The "ROS" platform will become the standard reporting tool for institutional investors to audit the "assets" (roster value) of the portfolio companies (universities).

### **7.3 Conclusion**

The Division I landscape has shifted from a governance challenge to a commercial operations challenge. The winners in this new era will not be the schools with the most donors, but the schools with the best *management* of their capital. The "General Manager" function is now the heartbeat of the athletic department, and the market for technology that empowers this function is a blue-ocean opportunity worth hundreds of millions in annual recurring revenue.

The *Athena GM* (University), *AgencyOS* (Collective), and *ProFit Athlete* (Student) product concepts outlined in this report represent the necessary infrastructure to stabilize and professionalize the multi-billion dollar economy of college sports.

### ---

**Appendix: Data Tables**

**Table 1: Comparison of Tax Status & Responsibilities**

| Feature | Revenue Sharing (University) | Third-Party NIL (Collective/Brand) |
| :---- | :---- | :---- |
| **Employment Status** | W-2 Employee | 1099 Independent Contractor |
| **Tax Withholding** | Automatic (Fed/State/FICA) | None (Athlete must estimate) |
| **Reporting System** | CAPS \-\> University Payroll | NIL Go |
| **Financial Aid Impact** | Counted as "Earned Income" (High Impact) | Counted as "Business Income" |
| **Benefits** | Potential 403(b), Workers Comp | None |

**Table 2: Breakdown of Deal Rejection Reasons (NIL Go)**

| Rejection Category | Description | Example | Prevention Strategy |
| :---- | :---- | :---- | :---- |
| **No Valid Business Purpose (VBP)** | Lack of specific deliverables or commercial intent. | "$10k for being a good teammate." | Include specific dates for posts/appearances. |
| **Range of Compensation (ROC)** | Payment exceeds Fair Market Value outliers. | "$50k for one tweet" (Backup Player). | Align pay with social media CPM rates. |
| **Passive Activation** | Payment for "rights" without "use." | "Buying rights to autograph" but never selling them. | Proof of actual sales or marketing usage. |
| **Inducement** | Deal contingent on enrollment/retention. | "Contract valid only if enrolled at X." | Remove enrollment contingencies from text. |

**Table 3: Recommended Technology Stack for Modern Athletic Dept.**

| Function | Current Status | Recommended Solution (2026+) |
| :---- | :---- | :---- |
| **Cap Compliance** | CAPS (LBi) | **Athena GM** (API integration with CAPS) |
| **Deal Clearance** | NIL Go (Deloitte) | **AgencyOS** (Pre-check integration) |
| **Roster Valuation** | Spreadsheets / Intuition | **AI Roster Valuation Engine** |
| **Payroll** | Workday / Oracle | **Athena GM** (Hybrid Tax/Cap View) |
| **Recruiting** | CRM (Salesforce) | **Predictive Transfer Portal Model** |

---

*Data Sources used in this report include:*

* *Settlement & Caps:* 1  
* *CSC, NIL Go, CAPS:* 6  
* *Enforcement:* 8  
* *University Operations:* 14  
* *AI & Commercialization:* 20

#### **Works cited**

1. House v. NCAA Settlement Approved: Era of Direct Payments to College Athletes Begins, accessed February 15, 2026, [https://www.ropesgray.com/en/insights/alerts/2025/06/house-v-ncaa-settlement-approved-era-of-direct-payments-to-college-athletes-begins](https://www.ropesgray.com/en/insights/alerts/2025/06/house-v-ncaa-settlement-approved-era-of-direct-payments-to-college-athletes-begins)  
2. Beyond NIL: How NCAA Revenue Sharing Changes College Athletics \- The Harris Law Firm, accessed February 15, 2026, [https://www.harrislawcares.com/blog/2026/january/beyond-nil-how-ncaa-revenue-sharing-changes-coll/](https://www.harrislawcares.com/blog/2026/january/beyond-nil-how-ncaa-revenue-sharing-changes-coll/)  
3. What the NCAA Settlement Means for Colleges and State Legislatures, accessed February 15, 2026, [https://www.ncsl.org/state-legislatures-news/details/what-the-ncaa-settlement-means-for-colleges-and-state-legislatures](https://www.ncsl.org/state-legislatures-news/details/what-the-ncaa-settlement-means-for-colleges-and-state-legislatures)  
4. NCAA Revenue Sharing & NIL Estimates 2025, accessed February 15, 2026, [https://nil-ncaa.com/](https://nil-ncaa.com/)  
5. The W2 Era: How Direct School Payments Change Financial ..., accessed February 15, 2026, [https://suresports.com/the-w2-era-how-direct-school-payments-change-financial-planning-for-athletes/](https://suresports.com/the-w2-era-how-direct-school-payments-change-financial-planning-for-athletes/)  
6. NIL After House: What Name, Image, and Likeness Means for Colleges and Higher-Education Institutions in 2026 \- Butler Snow, accessed February 15, 2026, [https://www.butlersnow.com/news-and-events/nil-after-house-what-name-image-and-likeness-means-for-colleges-and-higher-education-institutions-in-2026](https://www.butlersnow.com/news-and-events/nil-after-house-what-name-image-and-likeness-means-for-colleges-and-higher-education-institutions-in-2026)  
7. Student-Athlete NIL Deals \- College Sports Commission, accessed February 15, 2026, [https://www.collegesportscommission.org/nil/](https://www.collegesportscommission.org/nil/)  
8. College Sports Commission Releases January 2026 Report on NIL ..., accessed February 15, 2026, [https://businessofcollegesports.com/name-image-likeness/college-sports-commission-releases-new-report-on-nil-deals/](https://businessofcollegesports.com/name-image-likeness/college-sports-commission-releases-new-report-on-nil-deals/)  
9. New Era Begins As House Settlement Approved \- Big Ten Conference, accessed February 15, 2026, [https://bigten.org/mgolf/article/93/](https://bigten.org/mgolf/article/93/)  
10. NIL Go, accessed February 15, 2026, [https://nilgo.com/terms](https://nilgo.com/terms)  
11. “NIL Go”: Deloitte Establishes Basic Framework to Review Third-Party NIL Deals, accessed February 15, 2026, [https://www.nilrevolution.com/2025/05/nil-go-deloitte-establishes-basic-framework-to-review-third-party-nil-deals/](https://www.nilrevolution.com/2025/05/nil-go-deloitte-establishes-basic-framework-to-review-third-party-nil-deals/)  
12. Revenue Sharing \- College Sports Commission, accessed February 15, 2026, [https://www.collegesportscommission.org/revenue-sharing/](https://www.collegesportscommission.org/revenue-sharing/)  
13. College Athlete Payment System (CAPS), accessed February 15, 2026, [https://collegeathletepaymentsystem.com/](https://collegeathletepaymentsystem.com/)  
14. Basepath Enhances General Manager Tool to Meet NIL Demands, accessed February 15, 2026, [https://www.nilnewsstand.com/updates/basepath-general-manager-tool-nil](https://www.nilnewsstand.com/updates/basepath-general-manager-tool-nil)  
15. Title IX Legal Challenges Mount as Colleges and Universities Enter New Revenue-Sharing Landscape | Parker Poe, accessed February 15, 2026, [https://www.parkerpoe.com/news/2025/07/title-ix-legal-challenges-mount-as-colleges-and](https://www.parkerpoe.com/news/2025/07/title-ix-legal-challenges-mount-as-colleges-and)  
16. 2026 College Sports Predictions: NIL, Title IX & Athlete Mental Health, accessed February 15, 2026, [https://www.christinebrownsportslaw.com/news-insights/college-sports-2026-predictions](https://www.christinebrownsportslaw.com/news-insights/college-sports-2026-predictions)  
17. Post-House Student-Athlete Revenue Sharing: Avoiding Potential Title IX Pitfalls, accessed February 15, 2026, [https://www.bipc.com/post-house-student-athlete-revenue-sharing-avoiding-potential-title-ix-pitfalls](https://www.bipc.com/post-house-student-athlete-revenue-sharing-avoiding-potential-title-ix-pitfalls)  
18. College Sports Commission Set to Ease Restrictions on NIL Deals Involving Collectives, accessed February 15, 2026, [https://www.gmlaw.com/news/csc-set-to-ease-restrictions-on-nil-deals-involving-collectives/](https://www.gmlaw.com/news/csc-set-to-ease-restrictions-on-nil-deals-involving-collectives/)  
19. Enforcement \- College Sports Commission, accessed February 15, 2026, [https://www.collegesportscommission.org/enforcement/](https://www.collegesportscommission.org/enforcement/)  
20. Agentic AI's Next Iteration: From Super-AIs to Teams of Specialized Agents — And What It Means for Law & Business \- Commercial Litigation Update, accessed February 15, 2026, [https://www.commerciallitigationupdate.com/agentic-ais-next-iteration-from-super-ais-to-teams-of-specialized-agents-and-what-it-means-for-law-business](https://www.commerciallitigationupdate.com/agentic-ais-next-iteration-from-super-ais-to-teams-of-specialized-agents-and-what-it-means-for-law-business)  
21. Contracting for Agentic AI Solutions: Shifting the Model from SaaS to Services | Insights, accessed February 15, 2026, [https://www.mayerbrown.com/en/insights/publications/2026/02/contracting-for-agentic-ai-solutions-shifting-the-model-from-saas-to-services](https://www.mayerbrown.com/en/insights/publications/2026/02/contracting-for-agentic-ai-solutions-shifting-the-model-from-saas-to-services)  
22. AI tool uses data to redefine sport sponsorships \- Texas A\&M Stories, accessed February 15, 2026, [https://stories.tamu.edu/news/2026/01/06/ai-tool-uses-data-to-redefine-sports-sponsorships/](https://stories.tamu.edu/news/2026/01/06/ai-tool-uses-data-to-redefine-sports-sponsorships/)  
23. Beyond Payroll: The Real Demands Of Paying Student-Athletes, accessed February 15, 2026, [https://athleticdirectoru.com/articles/beyond-payroll-the-real-demands-of-paying-student-athletes/](https://athleticdirectoru.com/articles/beyond-payroll-the-real-demands-of-paying-student-athletes/)  
24. The Future of Football Player Evaluation \- Teamworks, accessed February 15, 2026, [https://teamworks.com/player-personnel-college-football/](https://teamworks.com/player-personnel-college-football/)

[image1]: <data:image/png;base64,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>