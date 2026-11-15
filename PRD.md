# RailRush — Product Requirements Document (PRD)

---

## 1. Product Vision

### What problem does RailRush solve?
Booking long-distance train travel across a nationwide rail network is notoriously fraught with high friction: confusing station codes, opaque segment seat availability, high booking failure rates during peak rush periods (like Tatkal), and unclear itinerary intermediate timings. 

RailRush provides a calm, reliable, and transparent journey search and reservation experience that guides passengers from intent to confirmed journey without clutter or uncertainty.

### Who are its users?
* **Everyday Intercity Travelers:** Commuters, business professionals, and families traveling between major regional hubs and intermediate towns.
* **Peak-Time Rush Bookers:** Travelers booking high-demand journeys who need instant clarity on whether a seat is actually secure or slipping away.

### What makes the product useful?
* **Precision Timetable Display:** Clear origin-to-destination departure/arrival dates, durations, and intermediate stops.
* **Segment-Aware Seat Transparency:** Real-time visibility into whether a seat is open for the specific travel stretch (Station A to Station B) vs. the entire route (Station A to Station Z).
* **Deterministic Reservation Workflow:** Clear lifecycle transitions: Intent → Temporary Seat Hold → Payment/Confirmation → Issued Boarding Pass.

---

## 2. User Personas

### Persona 1: Vikram — "The Rush Booker"
* **Profile:** 29-year-old software engineer planning urgent travel between New Delhi and Mumbai.
* **Goal:** Needs to book an available berth within minutes without encountering phantom availability, crashes, or unannounced double-bookings.
* **Pain Points:** Sees "Seat Available", clicks book, spends time entering details, and at checkout gets an error saying "Seat no longer available".

### Persona 2: Ananya — "The Route Planner"
* **Profile:** 42-year-old traveling with family from an intermediate junction station (e.g., Kota) to a destination terminal (e.g., Mumbai).
* **Goal:** Needs to see exactly when the train halts at her intermediate boarding station, what platform, and choose specific coach types (e.g., 3-Tier AC with Lower Berths for elders).
* **Pain Points:** Unclear whether long-distance trains halt long enough at intermediate stops; ambiguity about boarding vs origin departure dates (especially on trains crossing midnight).

---

## 3. Complete Passenger Journey

```
[1. Search Journey] 
        │ (Source, Destination, Travel Date, Quota)
        ▼
[2. Train Selection & Route Inspection]
        │ (Review schedules, durations, intermediate halts)
        ▼
[3. Availability & Class Selection]
        │ (1A, 2A, 3A, Sleeper; Check remaining quota)
        ▼
[4. Seat / Berth Preference & Passenger Details]
        │ (Names, age, berth preference; Temporary 10-minute hold initiated)
        ▼
[5. Booking Confirmation & Payment Processing]
        │ (Idempotent order confirmation)
        ▼
[6. Boarding Pass (Ticket Ivory) & Booking History]
        │ (Unique PNR generated; Ticket review; Cancel anytime before chart prep)
```

1. **Searching for Trains:** Passenger selects an Origin Station, a Destination Station, and a Travel Date.
2. **Selecting a Journey:** The system displays matching trains ordered by departure time. Passenger compares departure/arrival times, journey durations, and available classes.
3. **Viewing Intermediate Halts:** Passenger can expand any train card to inspect its full sequence of stops, arrival/departure times at each station, and halt durations (e.g., 5 min vs 15 min).
4. **Checking Availability:** For each class (e.g., 3A, 2A, SL), the system displays real-time inventory count (e.g., "AVAILABLE - 14" or "WL 6").
5. **Selecting Class & Passengers:** Passenger enters traveler names, age, gender, and berth preferences (e.g., Lower, Middle, Upper, Side Lower).
6. **Temporary Reservation Hold:** Upon entering the checkout step, the requested seat(s) enter a temporary held state with an expiring timer (e.g., 10 minutes) so other passengers cannot claim them while payment is being processed.
7. **Booking Confirmation:** Once finalized, the seat transitions from "Held" to "Confirmed", and an immutable PNR (Passenger Name Record) is issued.
8. **Viewing Ticket & History:** The passenger views their digital ticket formatted in the **Ticket Ivory** card motif, detailing PNR, Coach, Seat/Berth number, platform, and QR/status indicator.

---

## 4. User Stories

### Feature Group A: Network Search & Timetable Exploration
* **US-1.1:** As a passenger, I want to search for trains by specifying source and destination stations and travel date, so that I can see all trains servicing that corridor.
* **US-1.2:** As a passenger, I want to see intermediate stations, arrival times, and halt durations, so that I know exactly when the train passes through my station.
* **US-1.3:** As a passenger, I want to clearly see next-day arrivals marked with a `+1` indicator, so that I don't confuse arrival times on overnight journeys.

### Feature Group B: Inventory & Seat Availability
* **US-2.1:** As a passenger, I want to see available seat counts for each travel class for my specific travel segment, so that I can pick the class that guarantees a confirmed berth.
* **US-2.2:** As a passenger, I want my selected seats held for 10 minutes while I complete passenger details and checkout, so that nobody snatches my seat mid-form.

### Feature Group C: Passenger Booking & Reservation
* **US-3.1:** As a passenger, I want to enter passenger details (Name, Age, Gender, Berth Preference), so that the tickets reflect valid traveler identities.
* **US-3.2:** As a passenger, I want to receive a unique PNR and digital boarding pass upon confirmation, so that I have definitive proof of travel.
* **US-3.3:** As a passenger, I want to review my past and upcoming bookings, so that I can manage my itineraries.

### Feature Group D: Modifications & Cancellations
* **US-4.1:** As a passenger, I want to cancel a confirmed booking prior to chart preparation, so that my seat is released back to the pool and I receive an appropriate refund record.

---

## 5. Business Rules

### Rule Set 1: Search Eligibility & Route Logic
* **[CONFIRMED] Station Order Enforcement:** A train only qualifies as a search result if the boarding station appears **before** the destination station in that train’s defined stop sequence for that specific service day.
* **[CONFIRMED] Operating Days:** A train only appears if its scheduled service runs on the selected day of the week at the origin station.
* **[CONFIRMED] Minimum Station Gap:** Source and destination stations must be distinct; a passenger cannot select the same station as origin and destination.

### Rule Set 2: Segment Overlap & Inventory Logic
* **[CONFIRMED] Segment Reusability:** Train seats are physical assets that traverse an entire line (e.g., New Delhi → Kanpur → Prayagraj → Howrah).
  - If Passenger X books Seat 12 from *New Delhi to Kanpur*, Seat 12 is **available** for Passenger Y traveling from *Kanpur to Howrah*.
  - Seat 12 is **unavailable** for any passenger whose journey overlaps with the *New Delhi to Kanpur* segment (e.g., New Delhi to Prayagraj).
* **[DECISION NEEDED] Overlap Buffer Policy:** Do we allow boarding at the exact minute the previous passenger detrains at an intermediate station, or is there a turnaround buffer? *(Default recommendation: Zero buffer required for scheduled intermediate halts; passenger detrains and boarding passenger boards at the same station stop).*

### Rule Set 3: Reservation Lifecycle & Holds
* **[CONFIRMED] Hold Expiration:** A seat hold expires after exactly **10 minutes**. If confirmation does not occur, the hold state transitions to "Expired" and the seat segment immediately returns to the open inventory.
* **[CONFIRMED] Idempotent Confirmation:** Submitting confirmation multiple times (e.g., clicking the button twice or browser auto-retries) must produce exactly one confirmed booking without charging or holding twice.
* **[DECISION NEEDED] Waitlist Allocation:** When a confirmed booking is cancelled, does the waitlisted passenger automatically get promoted, or is the seat released back to general pool? *(Default recommendation for MVP: Immediate promotion of the earliest waitlisted passenger on that segment).*

---

## 6. Edge Cases and Failure Scenarios

1. **Midnight Boundary Crossing:**
   - A train departs Station A at 23:45 on Monday and arrives at Station B at 01:15 on Tuesday. Search on Tuesday from Station B must recognize that this train belongs to the service originating on Monday.
2. **Multiple Trains on Same Corridor:**
   - Multiple trains running between identical origin-destination stations at different times, with varying route speeds and halts, must be differentiated clearly by train number and total transit time.
3. **Concurrent Booking Attempts (The Tatkal Scenario):**
   - 10 passengers attempt to book the last remaining berth on the exact same segment simultaneously.
   - Exactly **1** passenger must successfully obtain the temporary hold; the other 9 must receive an immediate clean message stating the seat is no longer available, with zero data corruption or partial holds.
4. **Expired Hold During Confirmation:**
   - Passenger opens checkout, waits 10 minutes and 5 seconds, and then clicks Confirm. The system must reject the transaction because the lease has expired, preventing double bookings.
5. **Partial Segment Availability:**
   - A train has 1 available seat from NDLS to CNB, but 0 available seats from CNB to HWH. A passenger searching NDLS to HWH must see **0 / WL**, not available.

---

## 7. MVP Scope (Phased Delivery)

### Phase 1: MVP Scope (Small, Realistic, Complete)
* Static station network (5–8 key stations on a single trunk line, e.g., NDLS → CNB → PRYJ → DDU → HWH).
* 2–3 daily scheduled trains with defined intermediate halts and arrival/departure times.
* Search trains between any two stations on the trunk line.
* Schedule view (intermediate halt timeline).
* Seat inventory check for predefined travel classes (e.g., 3A, SL).
* Passenger detail entry and deterministic single-seat reservation.
* Ticket confirmation with unique PNR display in the **Ticket Ivory** card format.

### Features That Can Come Later:
* Multi-coach physical seat-map visual picker (selecting specific Berth: LB, MB, UB, SL, SU).
* Waitlist (WL) / RAC queue processing and promotion engine.
* User authentication and profile-based booking history.
* Multi-route connections / transfers across different rail lines.
* Quota management (Tatkal vs Ladies vs General).

---

## Your First Baby Step: Task 1

To keep this manageable and learn how requirements translate into backend systems, we will not jump into the entire system at once. We will start with **The Foundation of Movement: The Railway Network & Timetable**.

### 🎯 Task 1 Objective: Domain Modeling for Train Search & Schedules
Before writing any code or choosing a database:

1. **Review the following business scenario:**
   > Train `12951` runs daily from Station `A` to Station `D`, stopping at intermediate stations `B` and `C`.
   > A passenger wants to search for all trains going from Station `B` to Station `D` on a specific date.

2. **Your Exercise (Design Without Code):**
   - Identify the **core real-world concepts (nouns)** needed just to answer that search query (e.g., What is a Station? What is a Train? What is a Schedule/Halt? What is a Stop Sequence?).
   - Sketch an **Entity-Relationship (ER) diagram** or list the relationships on paper or in a document:
     - What attributes does each concept need?
     - How does the system know that Station `B` comes before Station `D` on Train `12951`?
     - How does the schedule handle arrival time vs departure time at intermediate halts?
