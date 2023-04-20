const clientId = `gurlalproductapp-375c7d498f29ae3300b39631b7729a074370341782217559532`;
const clientSecret = `5xs8b7IBmkiiA10SKaTfk5logSqiA9TJ7iMY3cjX`;

let _stores = [];
let token = ``;
const getToken = async () => {
  const result = await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    mode: "no-cors",
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

const getStores = async (token) => {
  const result = await fetch(
    "https://api.kroger.com/v1/locations?filter.limit=99",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token,
      },
    }
  );

  const response = await result.json();
  return response.data;
};

const loadStores = async () => {
  token = await getToken();
  _stores = await getStores(token);
};

const renderStores = (filterTerm) => {
  let source = _stores;

  if (filterTerm) {
    const term = filterTerm.toLowerCase();
    source = source.filter(({ name }) => {
      return name.toLowerCase().includes(term);
    });
  }

  const list = document.getElementById(`stores`);
  const html = source.reduce(
    (
      acc,
      {
        locationId,
        name,
        phone,
        address: { addressLine1, city, state, zipCode, county },
        hours: {
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          saturday,
        },
      }
    ) => {
      return (
        acc +
        `   
   <div class="card" onclick="getStoreProducts(\'${locationId}\')">
		<div class="store-info">
			<h2>${name}</h2>
      <p>${addressLine1}, ${city}, ${state} ${county} ${zipCode}</p>
			<p>Phone: ${phone}</p>
			<p>Opening Hours:</p>
			<ul>
      <li>Monday: ${monday.open} AM - ${monday.close} PM</li>
      <li>Tuesday: ${tuesday.open} AM - ${tuesday.close} PM</li>
      <li>Wednesday: ${wednesday.open} AM - ${wednesday.close} PM</li>
      <li>Thursday: ${thursday.open} AM - ${thursday.close} PM</li>
      <li>Friday: ${friday.open} AM - ${friday.close} PM</li>
      <li>Saturday: ${saturday.open} AM - ${saturday.close} PM</li>
      <li>Sunday: ${sunday.open} AM - ${sunday.close} PM</li>
			</ul>
		</div>
	</div>
   `
      );
    },
    ""
  );
  list.innerHTML = html;
};

loadStores().then(renderStores);

const onSubmit = (event) => {
  event.preventDefault();

  const term = event.target.term.value;
  renderStores(term);
};

const onReset = () => {
  renderStores();
};

const getStoreProducts = (locationId) => {
  window.location.assign(`/products.html?locationId=${locationId}`);
};
