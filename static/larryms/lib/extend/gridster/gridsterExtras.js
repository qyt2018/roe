(function(r,t){if(typeof define==="function"&&define.amd){define(["jquery","gridster"],t)}else{r.Gridster=t(r.$||r.jQuery,r.Gridster)}})(this,function(u,c){var r=c.prototype;r.widgets_in_col=function(r){if(!this.gridmap[r]){return false}for(var t=this.gridmap[r].length-1;t>=0;t--){if(this.is_widget(r,t)!==false){return true}}return false};r.widgets_in_row=function(r){for(var t=this.gridmap.length;t>=1;t--){if(this.is_widget(t,r)!==false){return true}}return false};r.widgets_in_range=function(r,t,i,e){var n=[];var o=[];var a=u([]);var f,s,l,c;for(f=i;f>=r;f--){for(s=e;s>=t;s--){l=this.is_widget(f,s);if(l!==false){c=l.data("coords").grid;if(c.col>=r&&c.col<=i&&c.row>=t&&c.row<=e){a=a.add(l)}}}}return a};r.get_bottom_most_occupied_cell=function(){var e=0;var n=0;this.for_each_cell(function(r,t,i){if(r&&i>e){e=i;n=t}});return{col:n,row:e}};r.get_right_most_occupied_cell=function(){var e=0;var n=0;this.for_each_cell(function(r,t,i){if(r){e=i;n=t;return false}});return{col:n,row:e}};r.for_each_cell=function(r,t){t||(t=this.gridmap);var i=t.length;var e=t[1].length;r:for(var n=i-1;n>=1;n--){for(var o=e-1;o>=1;o--){var a=t[n]&&t[n][o];if(r){if(r.call(this,a,n,o)===false){break r}else{continue}}}}};r.next_position_in_range=function(r,t,i){r||(r=1);t||(t=1);var e=this.gridmap;var n=e.length;var o=[];var a;for(var f=1;f<n;f++){a=i||e[f].length;for(var s=1;s<=a;s++){var l=this.can_move_to({size_x:r,size_y:t},f,s,i);if(l){o.push({col:f,row:s,size_y:t,size_x:r})}}}if(o.length>=1){return c.sort_by_col_asc(o)[0]}return false};r.closest_to_right=function(r,t){if(!this.gridmap[r]){return false}var i=this.gridmap.length-1;for(var e=r;e<=i;e++){if(this.gridmap[e][t]){return{col:e,row:t}}}return false};r.closest_to_left=function(r,t){var i=this.gridmap.length-1;if(!this.gridmap[r]){return false}for(var e=r;e>=1;e--){if(this.gridmap[e][t]){return{col:e,row:t}}}return false};return c});