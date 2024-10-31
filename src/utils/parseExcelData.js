// src/utils/parseExcelData.js
export const parseExcelData = (worksheet) => {
  const data = { breakfast: {}, lunch: {}, snacks: {}, dinner: {} };
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  // Meal mapping to the rows (adjust for your Excel layout)
  const mealRows = {
    breakfast: { start: 2, end: 6 }, // Rows for Breakfast
    lunch: { start: 7, end: 14 },    // Rows for Lunch
    snacks: { start: 15, end: 16 },  // Rows for Snacks
    dinner: { start: 17, end: 24 }   // Rows for Dinner
  };

  // Iterate over each day and extract data for each meal type
  daysOfWeek.forEach((day, dayIndex) => {
    const dayColumn = String.fromCharCode(67 + dayIndex); // Convert to column letters C to I
    
    Object.keys(mealRows).forEach((meal) => {
      const { start, end } = mealRows[meal];
      const items = [];

      // Collect all items in the specified row range for the meal
      for (let row = start; row <= end; row++) {
        const cellAddress = `${dayColumn}${row}`;
        if (worksheet[cellAddress] && worksheet[cellAddress].v) {
          items.push(worksheet[cellAddress].v);
        }
      }
      
      // Store items or default message if empty
      data[meal][day] = items.length ? items : ["Menu not available"];
    });
  });

  console.log("Parsed Excel data:", data); // Log to verify structure
  return data;
};
