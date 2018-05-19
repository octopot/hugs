DO $$
  DECLARE demoUser  "form_schema"."user"%TYPE := '00000000-0000-4000-8000-000000000000';
  DECLARE subscribe "form_data"."uuid"%TYPE   := 'b3a7610d-a982-4ede-b702-f556592f8204';
BEGIN
  INSERT INTO "form_schema" ("user", "uuid", "schema")
  VALUES
    (demoUser, subscribe, '
    <form lang="en" title="Subscribe"
          action="https://octolab.github.io/hugs/"
          method="post" enctype="application/x-www-form-urlencoded">
        <input name="email" type="email" title="Your Email" placeholder="Your Email..." maxlength="64" required="1"/>
    </form>
    ' :: XML)
    ON CONFLICT DO NOTHING;
END;
$$;
