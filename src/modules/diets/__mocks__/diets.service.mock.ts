import { GeneratedDietType } from '@/modules/diets/types/diet.schema';

export const dietsResponse: {
  message: string;
  timestamp: string;
  data: GeneratedDietType[];
} = {
  message: 'Success',
  timestamp: '2025-04-08T16:16:24.489Z',
  data: [
    {
      dietId: '030164f6-1152-44b8-8ea9-5fd7faa6c039',
      name: 'Dieta na dzień 1',
      description: 'Plan diety wegetariańska na dzień 1',
      dietPlan: {
        meals: {
          breakfast: {
            name: 'Pikantna Sałatka z Quinoa',
            description: 'Sałatka z quinoa, warzywami i przyprawami.',
            instructions:
              'Ugotuj quinoa zgodnie z instrukcją na opakowaniu. W misce wymieszaj ugotowaną quinoa, pokrojone w kostkę pomidory, ogórka i paprykę. Dodaj oliwę z oliwek, sok z cytryny, sól, pieprz, oraz ulubione ostre przyprawy. Podawaj na zimno.',
            ingredients: [
              {
                name: 'Quinoa',
                quantity: '1 szklanka',
              },
              {
                name: 'Pomidor',
                quantity: '1 sztuka',
              },
              {
                name: 'Ogórek',
                quantity: '1 sztuka',
              },
              {
                name: 'Papryka czerwona',
                quantity: '1 sztuka',
              },
              {
                name: 'Oliwa z oliwek',
                quantity: '2 łyżki',
              },
              {
                name: 'Sok z cytryny',
                quantity: '1 łyżka',
              },
              {
                name: 'Sól',
                quantity: 'do smaku',
              },
              {
                name: 'Pieprz',
                quantity: 'do smaku',
              },
            ],
          },
          lunch: {
            name: 'Pikantne Warzywa z Ciecierzycą',
            description: 'Smażone warzywa z ciecierzycą w ostrym sosie.',
            instructions:
              'Na dużej patelni rozgrzej oliwę i dodaj pokrojoną cebulę. Smaż przez kilka minut, następnie dodaj pokrojoną paprykę i cukinię. Po chwili dodaj ciecierzycę, pomidory z puszki i przyprawy. Gotuj przez 10-15 minut, aż warzywa będą miękkie. Podawaj na gorąco.',
            ingredients: [
              {
                name: 'Ciecierzyca (z puszki)',
                quantity: '1 puszka',
              },
              {
                name: 'Cebula',
                quantity: '1 sztuka',
              },
              {
                name: 'Papryka',
                quantity: '1 sztuka',
              },
              {
                name: 'Cukinia',
                quantity: '1 sztuka',
              },
              {
                name: 'Pomidory (z puszki)',
                quantity: '1 puszka',
              },
              {
                name: 'Czosnek',
                quantity: '2 ząbki',
              },
              {
                name: 'Ostra papryka w proszku',
                quantity: '1 łyżeczka',
              },
              {
                name: 'Oliwa z oliwek',
                quantity: '2 łyżki',
              },
            ],
          },
          dinner: {
            name: 'Makaron z Warzywami w Sosie Pomidorowym',
            description:
              'Bezglutenowy makaron ze świeżymi warzywami w aromatycznym sosie.',
            instructions:
              'Ugotuj makaron wg instrukcji na opakowaniu. W międzyczasie na patelni rozgrzej oliwę, dodaj cebulę i czosnek, a następnie pokrojone warzywa. Po 5 minutach dodaj pomidory z puszki, sól, pieprz oraz ulubione przyprawy. Dusz przez około 10 minut, na koniec wymieszaj z ugotowanym makaronem.',
            ingredients: [
              {
                name: 'Bezglutenowy makaron',
                quantity: '200g',
              },
              {
                name: 'Cebula',
                quantity: '1 sztuka',
              },
              {
                name: 'Czosnek',
                quantity: '2 ząbki',
              },
              {
                name: 'Pomidory (z puszki)',
                quantity: '1 puszka',
              },
              {
                name: 'Cukinia',
                quantity: '1 sztuka',
              },
              {
                name: 'Papryka',
                quantity: '1 sztuka',
              },
              {
                name: 'Oliwa z oliwek',
                quantity: '2 łyżki',
              },
              {
                name: 'Sól',
                quantity: 'do smaku',
              },
              {
                name: 'Pieprz',
                quantity: 'do smaku',
              },
            ],
          },
        },
      },
      assignedDate: '2025-04-08',
    },
    {
      dietId: '8e8be604-ad4e-474f-a783-6280686d5076',
      name: 'Dieta na dzień 2',
      description: 'Plan diety wegetariańska na dzień 2',
      dietPlan: {
        meals: {
          breakfast: {
            name: 'Ostra sałatka z pomidorów i ogórków',
            description:
              'Pikantna sałatka z pomidorów i ogórków z dodatkiem oliwy z oliwek i przypraw.',
            instructions:
              'Pokrój pomidory i ogórki w kostkę, dodaj drobno pokrojoną cebulę. Skrop oliwą z oliwek, dodaj sól, pieprz, i szczyptę chili. Wymieszaj i podawaj.',
            ingredients: [
              {
                name: 'Pomidory',
                quantity: '2 sztuki',
              },
              {
                name: 'Ogórki',
                quantity: '2 sztuki',
              },
              {
                name: 'Cebula',
                quantity: '1 sztuka',
              },
              {
                name: 'Oliwa z oliwek',
                quantity: '2 łyżki',
              },
              {
                name: 'Sól',
                quantity: 'do smaku',
              },
              {
                name: 'Pieprz',
                quantity: 'do smaku',
              },
              {
                name: 'Chili w proszku',
                quantity: 'szczypta',
              },
            ],
          },
          lunch: {
            name: 'Kuskus z warzywami i ciecierzycą',
            description:
              'Kuskus z warzywami i wyrazistą ciecierzycą w stylu śródziemnomorskim.',
            instructions:
              'Zagotuj wodę i dodaj kuskus, przykryj. Po 5 minutach, wymieszaj widelcem. Na patelni podsmaż cebulę, paprykę i cukinię, dodaj ciecierzycę z puszki, przypraw solą i pieprzem. Połącz z kuskusem.',
            ingredients: [
              {
                name: 'Kuskus',
                quantity: '100g',
              },
              {
                name: 'Ciecierzyca (konserwowa)',
                quantity: '1 puszka (400g)',
              },
              {
                name: 'Papryka',
                quantity: '1 sztuka',
              },
              {
                name: 'Cukinia',
                quantity: '1 sztuka',
              },
              {
                name: 'Cebula',
                quantity: '1 sztuka',
              },
              {
                name: 'Sól',
                quantity: 'do smaku',
              },
              {
                name: 'Pieprz',
                quantity: 'do smaku',
              },
            ],
          },
          dinner: {
            name: 'Zupa pomidorowa z soczewicą',
            description:
              'Aromatyczna zupa pomidorowa z dodatkiem soczewicy i świeżych ziół.',
            instructions:
              'Na dużym ogniu podsmaż cebulę i czosnek do zeszklenia, dodaj pokrojone pomidory w puszce oraz soczewicę. Dodaj bulion warzywny i gotuj przez 20 minut. Przypraw solą, pieprzem i świeżymi ziołami.',
            ingredients: [
              {
                name: 'Pomidory (konserwowe)',
                quantity: '2 puszki (400g każda)',
              },
              {
                name: 'Soczewica (sucha)',
                quantity: '100g',
              },
              {
                name: 'Cebula',
                quantity: '1 sztuka',
              },
              {
                name: 'Czosnek',
                quantity: '2 ząbki',
              },
              {
                name: 'Bulion warzywny',
                quantity: '1 litr',
              },
              {
                name: 'Sól',
                quantity: 'do smaku',
              },
              {
                name: 'Pieprz',
                quantity: 'do smaku',
              },
              {
                name: 'Świeże zioła (np. bazylia, oregano)',
                quantity: 'do smaku',
              },
            ],
          },
        },
      },
      assignedDate: '2025-04-09',
    },
  ],
};
