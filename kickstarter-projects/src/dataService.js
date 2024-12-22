export const fetchKickstarterProjects = async () => {
    // const url = "/frontend-assignment.json";
    try {
        const response = await fetch("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // console.log({ data });
        return data;
    } catch (error) {
        console.error("Error fetching local JSON file:", error);
        return [];
    }
};
