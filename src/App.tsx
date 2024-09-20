import { Container, Typography } from "@mui/material";
import "./App.css";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import HabitStats from "./components/HabitStats";

function App() {
  return (
    <Container maxWidth="md">
      <Typography
        component="h1"
        variant="h3"
        align="center"
        sx={{
          my: 2,
        }}
      >
        Habit Tracker
      </Typography>
      <AddHabitForm />
      <HabitList />
      <HabitStats />
    </Container>
  );
}

export default App;
