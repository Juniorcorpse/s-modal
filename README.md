# Plugin jQuery s-modal
*Author: Robson Suzin*
Using jQuery


```
Dados para serem enviados no objeto:

smodalname = app_modal_dialog (Abre uma modal dialog) | Outro nome adiciona conteudo html
smodaltype = Ex.: info delete delete_photo ( Atribui os estilos padrões da modal )
smodalhtml = Ex.: Conteúdo HTML da Modal
smodalwidth = Qual será o tamanho da modal - Padrão 500px - Ex: 90%
smodalprint = true (Adiciona um botão de print)

smodaleffect = Qual efeito que vai aparecer a modal, jqueryUi

smodaldata = Qual objeto vai receber os data() do evento

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

saddcss = Adiciona um css ao elemento
Ex.: elemento::css==valor

```
#### Exemplos de utilização 
##### Abrindo uma modal pela ação de um botão

```
Botão que vai receber o click

<a class="icon-trash-o btn btn-danger" href="#" title="Deletar?"
smodalname="app_modal_dialog"
smodaltype="delete"
smodaldata="js-confirm"
saddhtml="js-title::Atenção: Tem certeza que deseja excluir esse departamento! Essa Ação não pode ser desfeita!"
data-id="conteudo"
>Deletar</a>

Script que monitora o botão:

$(document).on('click', "[smodalname]", function (e) {
    e.preventDefault();
    $(this).smodal();
});    

```
##### Abrindo modal pelo callback do ajax

```
Objeto para ser enviado ao callback

$data = new \stdClass();
$data->smodaltype = "info";
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
##### Helper para Montar as Opções do botão

```
/**
 * @param array $options
 * @return string
 */
function smodal(array $options): string
{
    $result = "";
    foreach ($options as $key => $value) {
        if(!is_array($value)) {
            $result .= "{$key}='{$value}' ";
        } else {
            $result .= "{$key}='";
            foreach ($value as $subkey => $subvalue) {
                if(!is_array($subvalue)) {
                    $result .= "{$subkey}::{$subvalue}|";
                 } else {
                    foreach ($subvalue as $ssbkey => $ssvalue) {
                        $result .= "{$subkey}::{$ssbkey}=={$ssvalue}|";
                    }
                }
            }
            $result = substr($result, 0, -1);
            $result .= "' ";
        }
    }
    return $result;
}

```
##### Exemplo de Utilização do helper

```
$smodal_delete = smodal([
        "smodalname" => "app_modal_dialog",
        "smodaltype" => "delete",
        "sadddata" => [
            "js-confirm" => ["post", url("/" . CONF_VIEW_APP . "/registration/departament")]],
            "saddhtml" => [
            "js-title" => "<b>Atenção:</b> Tem certeza que deseja excluir esse departamento! Essa Ação não pode ser desfeita!"
            ]
        ]);
        
<a class="icon-trash-o btn btn-small btn-red" href="#" title="Deletar Departamento?"
        <?= $smodal_delete;?>
        data-action="delete"
        data-id="<?= $departament->id; ?>">Deletar</a>
