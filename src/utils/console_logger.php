<?php
if (!function_exists('jslog')) {
  function jslog($data)
  {
    $html = "<script>";
    $html .= "console.log({";

    foreach ($data as $key => $val) {
      $html .= $key . ": " . json_encode($val) . ",";
    }

    $html .= "})";
    $html .= "</script>";

    return $html;
  }
}
