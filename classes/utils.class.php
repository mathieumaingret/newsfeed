<?php

abstract class App 
{
	/**
	 * 
	 */
	public static function debug($datas)
	{
		echo '<pre>';
		print_r($datas);
		echo '</pre>';
	}

	/**
    * Theming de templates avec transmission de données
    *
    * @param string $template  Nom du template à retourner (sans extension, .tpl.php)
    * @param string $datas Nom du fichier content les données à retourner (sans extension, .xml)
    * @param array  $attributes Attributs facultatifs à inclure comme des class
    * @return template
    */
	public static function render($template, $entity, $attributes = array())
	{
		extract($attributes, EXTR_SKIP);
		ob_start();
		
		if (file_exists('../templates/'.$template.'.tpl.php')) {
			include '../templates/'.$template.'.tpl.php';
			return ob_get_clean();
		}

		return '';
			
	}
}