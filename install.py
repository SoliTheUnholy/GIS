import subprocess
from os import chdir as chd
from os import listdir as lir
def run(code):
  code_list = code.split()
  subprocess.run(code.split(), check = True, shell= True)
while True:
  try:
    run("pnpm dlx shadcn-ui@latest add input label button card")
    break
  except:
    continue