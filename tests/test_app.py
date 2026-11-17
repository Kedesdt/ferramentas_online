import unittest
from app import app


class AppTestCase(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.client = app.test_client()

    def test_home_page(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("Ferramentas Tech", response.get_data(as_text=True))

    def test_tool_routes(self):
        for route in (
            "/calculadora",
            "/grafico",
            "/qr-code",
            "/lei-de-ohm",
            "/resistor",
            "/queda-de-tensao",
        ):
            with self.subTest(route=route):
                self.assertEqual(self.client.get(route).status_code, 200)

    def test_product_redirect_requires_url(self):
        response = self.client.get("/produto?name=Multimetro")
        page = response.get_data(as_text=True)
        self.assertEqual(response.status_code, 200)
        self.assertIn("Multimetro", page)
        self.assertIn("não possui um endereço", page)


if __name__ == "__main__":
    unittest.main()
