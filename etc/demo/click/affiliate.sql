DO $$
  DECLARE demoUser     "link"."user"%TYPE := '00000000-0000-4000-8000-000000000000';
  DECLARE digitalocean "link"."id"%TYPE   := '1aaa4802-5b8a-44ec-9e4f-94ac3838c8a0';
  DECLARE patreon      "link"."id"%TYPE   := 'a4cda71e-929a-487c-a56e-c896f8197d19';
  DECLARE ecwid        "link"."id"%TYPE   := '3aa81c24-b541-450a-9f25-ab27a229bf69';
  DECLARE themeforest  "link"."id"%TYPE   := '57f2c508-b76e-48a1-ae44-ec59a425ea81';
  DECLARE linode       "link"."id"%TYPE   := '098625d3-c6e3-45d2-a9fe-3102623ab197';
  DECLARE vultr        "link"."id"%TYPE   := '00049bd0-a305-43fc-877a-c3579eaabf75';
  DECLARE designmodo   "link"."id"%TYPE   := 'ce465427-9de9-46ce-ad49-536c75b33070';
BEGIN
  INSERT INTO "link" ("user", "id", "name")
  VALUES
    (demoUser, digitalocean, 'DigitalOcean: Cloud Computing, Simplicity at Scale'),
    (demoUser, patreon, 'Best way for artists and creators to get sustainable income and connect with fans | Patreon'),
    (demoUser, ecwid, '#1 Free E-commerce Shopping Cart & Online Store Solution - Try Ecwid!'),
    (demoUser, themeforest, 'WordPress Themes & Website Templates from ThemeForest'),
    (demoUser, linode, 'SSD Cloud Hosting & Linux Servers - Linode'),
    (demoUser, vultr, 'SSD VPS Servers, Cloud Servers and Cloud Hosting by Vultr - Vultr.com'),
    (demoUser, designmodo, 'Designmodo: Web Design Blog, Website and Email Template Builders')
    ON CONFLICT DO NOTHING;

  INSERT INTO "alias" ("link_id", "urn")
  VALUES
    (digitalocean, 'digitalocean'),
    (patreon, 'patreon'),
    (ecwid, 'ecwid'),
    (themeforest, 'themeforest'),
    (linode, 'linode'),
    (vultr, 'vultr'),
    (designmodo, 'designmodo')
    ON CONFLICT DO NOTHING;

  INSERT INTO "target" ("link_id", "uri")
  VALUES
    (digitalocean, 'https://m.do.co/c/b2a387de5da4'),
    (patreon, 'https://www.patreon.com/octolab/memberships'),
    (ecwid, 'http://open.ecwid.com/l6Q7P'),
    (themeforest, 'https://themeforest.net/?ref=kamilsk'),
    (linode, 'https://www.linode.com/?r=2380225d05c74b69bd7e553a8c763808733fc71f'),
    (vultr, 'https://www.vultr.com/?ref=7232541'),
    (designmodo, 'https://designmodo.com/products/?u=22')
    ON CONFLICT DO NOTHING;
END;
$$;
