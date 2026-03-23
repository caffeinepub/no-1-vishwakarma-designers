# Vishwakarma Design Studio

## Current State
Admin panel at /admin has:
- Internet Identity login
- Order table with status update (pending/inProgress/completed)
- Basic stats: total, pending, in progress counts
- Reset & Claim Admin button

## Requested Changes (Diff)

### Add
- Search bar to filter orders by customer name, phone, or email
- Filter dropdown by service category and by status
- Order statistics: completed count, most popular service
- Export orders as CSV download
- Delete order button per row
- Expandable order row or modal to view full customer details (address, notes)
- Backend: deleteOrder(orderId) function

### Modify
- Stats cards: add Completed count and Most Popular Service
- Orders table: add address/notes view, delete button

### Remove
- Nothing removed

## Implementation Plan
1. Add `deleteOrder` to backend main.mo
2. Update frontend AdminPage.tsx:
   - Add search input and filter dropdowns (category, status)
   - Expand stats to 5 cards (total, pending, in progress, completed, top service)
   - Add expandable detail row showing address and notes
   - Add delete button per row
   - Add Export CSV button
