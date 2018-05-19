DO $$
  DECLARE demoUser "form_schema"."user"%TYPE := '00000000-0000-4000-8000-000000000000';
  DECLARE feedback "form_data"."uuid"%TYPE   := '629c995b-3dc1-4484-8e6c-f74007645bcd';
BEGIN
  INSERT INTO "form_schema" ("user", "uuid", "schema")
  VALUES
    (demoUser, feedback, '
    <form lang="en" title="Hugs feedback"
          action="https://octolab.github.io/hugs/"
          method="post" enctype="application/x-www-form-urlencoded">
        <input name="name" type="text" title="Your Name" maxlength="64" required="1"/>
        <input name="email" type="email" title="Your Email" maxlength="64" required="1"/>
        <input name="feedback" type="hidden" title="Your Feedback" maxlength="5120" required="1"/>
    </form>
    ' :: XML)
    ON CONFLICT DO NOTHING;
END;
$$;
