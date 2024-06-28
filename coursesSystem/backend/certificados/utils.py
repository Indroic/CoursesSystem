import os
import pdfkit
import jinja2

from django.conf import settings

def generar_pdf(user, course):
    env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.join(settings.BASE_DIR, 'media/pdf/')))

    conf = pdfkit.configuration(wkhtmltopdf=settings.WKHTMLTOPDF_PATH)

    template = env.get_template('plantilla.html')

    ##config = pdfkit.configuration(wkhtmltopdf="C:\Program Files\wkhtmltopdf\ bin" )

    html_out = template.render({'userName': user.username, 'courseName': course.name})

    name = f'/pdf/{user.username}-{course.name}.pdf'

    name = name.replace(' ', '-')

    archivo = pdfkit.from_string(html_out, output_path=os.path.join(settings.BASE_DIR, f'media/{name}'), configuration=conf)

    return name