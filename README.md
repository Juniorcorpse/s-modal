# Plugin jQuery s-modal
*Author: Robson Suzin*
Using jQuery


```
Dados para serem enviados no objeto:

modalname = Nome para a modal
modaltype = Ex.: info | delete | delete_photo ( Atribui os estilos padrões da modal )
modalhtml = Ex.: Conteúdo HTML da Modal
modalwidth = Qual será o tamanho da modal - Padrão 500px

modaldata = Data() que estavam armazenados no objeto do evento
modaldatainsert = Qual objeto vai receber os data()

sadddata = Adiciona Data 
Ex.: elemento::data==valor|elemento::data==valor

sremovedata = Remover Data 
Ex.: elemento::data|elemento::data

saddattr = Adiciona Atributos
Ex.: elemento::attr==valor|elemento::attr==valor

sremoveattr = Remover Atributos 
Ex.: elemento::attr==valor|elemento::attr==valor

saddhtml = Adiciona Html 
Ex.: elemento::valor|elemento::valor

saddclass = Adicionar Class 
Ex.: elemento::class|elemento::class

sremoveclass = Remove Class
Ex.: elemento::class|elemento::class

sremoveelement = Remove Class 
Ex.: elemento|elemento
```
#### Exemplos de utilização 
##### Abrindo uma modal pela ação de um botão

```
Botão que vai receber o click

<a class="icon-trash-o btn btn-small btn-red" href="#" title="Deletar Departamento?"
s-modal="true"
s-modaltype="delete"
s-adddata="class::data-id==conteudo"
s-addhtml="js-title::Atenção: Tem certeza que deseja excluir esse departamento! Essa Ação não pode ser desfeita!"
data-id="conteudo"
>Deletar</a>

Script que monitora o botão:

$("[s-modal]").on('click', function (e) {
        e.preventDefault();

        $(this).smodal({
            'modalname' : $(this).attr('s-modalname'),
            'modalhtml' : $(this).attr('s-modalhtml'),
            'modaltype' : $(this).attr('s-modaltype'),
            'modalwidth' : $(this).attr('s-modalwidth'),
            'sadddata' : $(this).attr('s-adddata'),
            'sremovedata' : $(this).attr('s-removedata'),
            'saddattr' : $(this).attr('s-addattr'),
            'sremoveattr' : $(this).attr('s-removeattr'),
            'saddhtml' : $(this).attr('s-addhtml'),
            'saddclass' : $(this).attr('s-addclass'),
            'sremoveclass' : $(this).attr('s-removeclass'),
            'sremoveelement' : $(this).attr('s-removeelement'),
            'modaldata' : $(this).data()
        });
    });    
```
##### Abrindo modal pelo callback do ajax

```
Objeto para ser enviado ao callback

$data = new \stdClass();
$data->modaltype = "info";
$data->saddhtml = 'class::conteudo';
$data->saddclass = 'class::conteudo|class::conteudo';
$data->saddattr = 'class::atributo==conteudo';
$data->sremovedata = 'class::data';

$json["smodal"] = $data;
echo json_encode($json);

Monitoramento do callback

if (response.smodal) {
    $(this).smodal(response.smodal);
}
```
##### Abrindo uma modal existente no documento

```
Adicionar a modal ao documento 

Ex.:
<div class="app_modal nomeparamodal" s-modalclose="true">
    <div class="app_modal_box">
        <span><a class="app_modal_close rounded" s-modalclose="true" href="#">x</a></span>
        Conteudo da Modal
    </div>
</div>

Adicionar ao elemento que vai abrir a modal existente no documento

s-modal="nomeparamodal"

Monitoramento do objeto que vai ser clicado

$("[s-modal]").on('click', function (e) {
        e.preventDefault();

        $(this).smodal({
            'modalname' : $(this).attr('s-modalname'),
            'modalhtml' : $(this).attr('s-modalhtml'),
            'modaltype' : $(this).attr('s-modaltype'),
            'modalwidth' : $(this).attr('s-modalwidth'),
            'sadddata' : $(this).attr('s-adddata'),
            'sremovedata' : $(this).attr('s-removedata'),
            'saddattr' : $(this).attr('s-addattr'),
            'sremoveattr' : $(this).attr('s-removeattr'),
            'saddhtml' : $(this).attr('s-addhtml'),
            'saddclass' : $(this).attr('s-addclass'),
            'sremoveclass' : $(this).attr('s-removeclass'),
            'sremoveelement' : $(this).attr('s-removeelement'),
            'modaldata' : $(this).data()
        });
    });   
```



